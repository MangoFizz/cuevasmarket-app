import React, { useEffect, useState } from "react"
import { currentLang, locale, strings } from "../localization";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { StoreBranchesSearchResult, searchStoreBranches } from "../services/storebranches.service";
import { isUserLogged } from "../helpers/loggedUser";
import AdminSidebar from "./StoreBranchesList.css";
import GoogleMaps from "./GoogleMaps/GoogleMaps";
import GoogleMapsWrapper from "./GoogleMaps/GoogleMapsWrapper";
import { Button } from "react-bootstrap";

const StoreBranchesList = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const branchesPerPage = 10;
    const navigate = useNavigate();

    const fetchSearchResults = async (searchQuery, page) => {
        try {
            let r = await searchStoreBranches(searchQuery, branchesPerPage, page);

            switch(r.result) {
                case StoreBranchesSearchResult.Success: {
                    console.log(r.data);
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
        navigate("/registrar-sucursal");
    }

    const handleBranchCardClick = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    const handleSearchInputKeyDown = (event) => {
        if(event.key === "Enter") {
            setCurrentPage(1);
            fetchSearchResults(event.target.value, 1);
        }
    }

    return (
        <div className="d-flex">
            <div className="content flex-fill">
                <div className="d-flex store-branches-options-bar">
                    <div className="input-group search-bar">
                        <input type="search" id="form1" className="form-control" placeholder={strings.storeBranchesList.searchBarPlaceholder} aria-label="Search" onChange={handleSearchInputChange} onKeyDownCapture={handleSearchInputKeyDown} />
                        <span className="input-group-text" id="search"><i className="bi bi-search"></i></span>
                    </div>
                    <button type="button" class="btn btn-success text-nowrap" onClick={handleRegisterBranchButton}>{strings.storeBranchesList.registerNewStoreBranch}</button>
                </div>

                <GoogleMapsWrapper>

                    {searchResults.map(storeBranch => {
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
                                                <p className="card-text">{storeBranch.address + ", " + storeBranch.city}</p>
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
                                                <Button variant="primary">Editar</Button>
                                                <Button variant="danger">Eliminar</Button>
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
        </div>
    )
}

export default StoreBranchesList
