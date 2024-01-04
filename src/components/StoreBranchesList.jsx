import React, { useEffect, useState } from "react"
import { currentLang, locale, strings } from "../localization";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { StoreBranchesSearchResult, deleteStoreBranch, searchStoreBranches } from "../services/storebranches.service";
import { isUserLogged } from "../helpers/loggedUser";
import AdminSidebar from "./StoreBranchesList.css";
import GoogleMaps from "./GoogleMaps/GoogleMaps";
import GoogleMapsWrapper from "./GoogleMaps/GoogleMapsWrapper";
import { Button, Modal } from "react-bootstrap";

const StoreBranchesList = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [selectedStoreBranchId, setSelectedStoreBranchId] = useState(null);

    const branchesPerPage = 5;
    const navigate = useNavigate();

    const fetchSearchResults = async (searchQuery, page) => {
        try {
            let r = await searchStoreBranches(searchQuery, branchesPerPage, page);

            switch(r.result) {
                case StoreBranchesSearchResult.Success: {
                    let responseData = r.data;
                    setSearchResults(responseData.results);
                    setCurrentPage(responseData.currentPage);
                    setTotalPages(responseData.totalPages);
                    return;
                }
                case StoreBranchesSearchResult.UnknownError: {
                    let response = await r.json();
                    console.log(response);
                    return;
                }
                default: {
                    console.log("Server returned non-200 status code");
                    return;
                }
            }
        }
        catch (e) {
            console.log(`Failed to fetch search results: ${e}`);
        }
        setSearchResults([]);
    };

    useEffect(() => {
        if(!isUserLogged()) {
            navigate("/login");
            return;
        }
        fetchSearchResults("", 1);
        setSearchQuery("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            fetchSearchResults(searchQuery, currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if(currentPage > 1) {
            fetchSearchResults(searchQuery, currentPage - 1);
        }
    }

    const handlePageChange = (page) => {
        fetchSearchResults(searchQuery, page);
    }

    const handleRegisterBranchButton = () => {
        navigate("registrar");
    }

    const handleSearchInputKeyDown = (event) => {
        if(event.key === "Enter") {
            setCurrentPage(1);
            fetchSearchResults(event.target.value, 1);
        }
    }

    const handleSearchButtonClick = () => {
        setCurrentPage(1);
        fetchSearchResults(searchQuery, 1);
    }

    const handleDeleteStoreBranchButtonClick = async () => {
        setShowDeleteConfirmationModal(false);
        try {
            if(selectedStoreBranchId !== null) {
                let r = await deleteStoreBranch(selectedStoreBranchId);
                switch(r.result) {
                    case StoreBranchesSearchResult.Success: {
                        await fetchSearchResults(searchQuery, currentPage);
                        break;
                    }
                    default: {
                        console.log(`Server returned non-200 status code: ${r.data}`);
                        break;
                    }
                    setShowDeleteConfirmationModal(false);
                }
            }
        }
        catch (e) {
            console.log(`Failed to delete store branch: ${e}`);
        }
    }

    return (
        <div className="d-flex">
            <div className="content flex-fill">
                <div className="d-flex store-branches-options-bar">
                    <div className="input-group search-bar">
                        <input type="search" id="form1" className="form-control" placeholder={strings.storeBranchesList.searchBarPlaceholder} aria-label="Search" onChange={handleSearchInputChange} onKeyDownCapture={handleSearchInputKeyDown} />
                        <span className="input-group-text" id="search" onClick={handleSearchButtonClick} style={{ cursor: "pointer" }}><i className="bi bi-search"></i></span>
                    </div>
                    <button type="button" className="btn btn-success text-nowrap" onClick={handleRegisterBranchButton}>{strings.storeBranchesList.registerNewStoreBranch}</button>
                </div>

                <GoogleMapsWrapper>

                    {searchResults?.map(storeBranch => {
                        // parse date from 1970-01-01 18:00:00.000000 format 
                        let openingHours = storeBranch.openingHours.date.split(" ")[1].split(":").slice(0, 2).join(":");
                        let closingHours = storeBranch.closingHours.date.split(" ")[1].split(":").slice(0, 2).join(":");

                        let locations = [
                            { lat: parseFloat(storeBranch.latitude), lng: parseFloat(storeBranch.longitude) }
                        ];

                        return (
                            <div className="card store-branch-card" key={storeBranch.id}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title">{storeBranch.name}</h5>
                                                <p className="card-text">{storeBranch.address}</p>
                                                <div className="d-flex flex-wrap">
                                                    <div className="d-flex flex-wrap">
                                                        <div className="card-store-branch-detail">
                                                            <i className="bi bi-door-open"></i>
                                                            <span> {openingHours + " hrs"}</span>
                                                        </div>
                                                        <div className="card-store-branch-detail">
                                                            <i className="bi bi-door-closed"></i>
                                                            <span> {closingHours + " hrs"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="store-branch-options">
                                                <Button variant="primary" onClick={() => { navigate(`editar/${storeBranch.id}`) }} >Editar</Button>
                                                <Button variant="danger" onClick={() => { setSelectedStoreBranchId(storeBranch.id); setShowDeleteConfirmationModal(true) }}>Eliminar</Button>
                                            </div>
                                        </div>
                                        <GoogleMaps mapId="map_id" locations={locations} className={"branchLocationMap"} />
                                    </div>
                                    {/* <a href="#!" className="stretched-link" onClick={() => handleBranchCardClick(storeBranch.id)}></a> */}
                                </div>
                            </div>
                        )
                    })}

                </GoogleMapsWrapper>

                {searchResults !== null && searchResults.length === 0 ? <h5 style={{ textAlign: "center" }} className="mb-3">{strings.storeBranchesList.noResults}</h5> : null}

                <nav aria-label="Page navigation" className="navigation">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link" href="#!" onClick={handlePreviousPage}><span aria-label="previous page">&laquo;</span></a>
                        </li>
                        {Array.from({length: totalPages}, (_, i) => i + 1).map(page => {
                            return (
                                <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
                                    <a className="page-link" href="#!" onClick={() => handlePageChange(page)}>{page}</a>
                                </li>
                            )
                        })}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <a className="page-link" href="#!" onClick={handleNextPage}><span aria-label="next page">&raquo;</span></a>
                        </li>
                    </ul>
                </nav>
            </div>

            <Modal show={showDeleteConfirmationModal}>
                <Modal.Header>
                    <Modal.Title>Eliminar sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro que desea eliminar la sucursal?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDeleteStoreBranchButtonClick}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StoreBranchesList
