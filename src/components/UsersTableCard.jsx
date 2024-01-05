import { Button, Card, Form, InputGroup, ButtonGroup, Modal, Image } from "react-bootstrap";
import { strings } from "../localization";
import BootstrapTable from "react-bootstrap-table-next";
import { useEffect, useState } from "react";
import { UsersServiceResult, deleteUser, searchUsers } from "../services/users.service";
import "./UsersTableCard.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const UsersTableCard = () => {
    const [users, setUsers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState({}); 
    const [viewUserDetailsModalShow, setViewUserDetailsModalShow] = useState(false);
    const [deleteUserConfirmationModalShow, setDeleteUserConfirmationModalShow] = useState(false);

    const branchesPerPage = 15;

    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchResults(searchQuery, currentPage);
    }, []);

    const fetchSearchResults = async (searchQuery, page) => {
        try {
            let r = await searchUsers(searchQuery, branchesPerPage, page);
            switch(r.result) {
                case UsersServiceResult.Success: {
                    let responseData = r.data;

                    // remove users of type "customer" from the list jijiji
                    responseData.results = responseData.results.filter(user => user.type !== "customer");

                    setUsers(responseData.results);
                    setCurrentPage(responseData.currentPage);
                    setTotalPages(responseData.totalPages);
                    return;
                }
                case UsersServiceResult.UnknownError: {
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
        setUsers([]);
    };

    const handleUserSearchInputChange = async (e) => {
        setSearchQuery(e.target.value);
        await fetchSearchResults(e.target.value, currentPage);
    }

    const handlePageChange = (page) => {
        fetchSearchResults(searchQuery, page);
    }

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

    const handleAddUserButtonClick = () => {
        navigate("registrar");
    }

    const handleDeleteUserButtonClick = async () => {
        try {
            let r = await deleteUser(selectedUser.id);
            switch(r.result) {
                case UsersServiceResult.Success: {
                    setDeleteUserConfirmationModalShow(false);
                    await fetchSearchResults(searchQuery, currentPage);
                    return;
                }
                case UsersServiceResult.UnknownError: {
                    console.log(r);
                    return;
                }
                default: {
                    console.log("Server returned non-200 status code");
                    return;
                }
            }
        }
        catch (e) {
            console.log(`Failed to delete user: ${e}`);
        }
    }

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
                    <h5 style={{margin: "0"}}>{strings.usersTableCard.header}</h5>
                    <div className="d-flex event-guests-button-bar">
                        <InputGroup>
                            <Form.Control placeholder={strings.usersTableCard.searchBarPlaceholder} aria-label="Search" onChange={handleUserSearchInputChange}/>
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                        </InputGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <BootstrapTable 
                        keyField="id"
                        data={users}
                        hover={true}
                        striped={true}
                        rowClasses={"user-table-cell"}
                        columns={[
                            {
                                dataField: "username",
                                text: strings.usersTableCard.usernameColumn
                            },
                            {
                                dataField: "firstName",
                                text: strings.usersTableCard.firstNameColumn,
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "surnames",
                                text: strings.usersTableCard.surnamesColumn,
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "type",
                                text: strings.usersTableCard.typeColumn,
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "options",
                                classes: "d-flex justify-content-center",
                                formatter: (cell, row, rowIndex, formatExtraData) => {
                                    return (
                                        <ButtonGroup>
                                            <Button variant="secondary" className="text-nowrap" onClick={() => { setSelectedUser(row); setViewUserDetailsModalShow(true); }}><i className="bi bi-eye-fill"></i></Button>
                                            <Button variant="secondary" className="text-nowrap" onClick={() => { navigate(`editar/${row.id}`) }}><i className="bi bi-pencil-fill"></i></Button>
                                            <Button variant="danger" className="text-nowrap" onClick={ () => { setSelectedUser(row); setDeleteUserConfirmationModalShow(true); } }><i className="bi bi-x-lg"></i></Button>
                                        </ButtonGroup>
                                    );
                                }
                            }
                        ]}
                        classes="table-sm"/>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <nav aria-label="Page navigation" className="navigation">
                            <ul className="pagination justify-content-center mb-0">
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
                        <div>
                            <Button variant="primary" className="text-nowrap" onClick={handleAddUserButtonClick}><i className="bi bi-plus-lg"></i> {strings.usersTableCard.addUserButton}</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

            <Modal show={viewUserDetailsModalShow} scrollable>
                <Modal.Header>
                    <Modal.Title>{strings.usersTableCard.viewUserDetailsModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.usersTableCard.viewUserDetailsModalFirstNameLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedUser.firstName}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.usersTableCard.viewUserDetailsModalSurnamesLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedUser.surnames}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.usersTableCard.viewUserDetailsModalUsernameLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedUser.username}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.usersTableCard.viewUserDetailsModalTypeLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedUser.type}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setViewUserDetailsModalShow(false)}>{strings.usersTableCard.modalCloseButton}</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteUserConfirmationModalShow}>
                <Modal.Header>
                    <Modal.Title>{strings.usersTableCard.deleteUserConfirmationModalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{strings.usersTableCard.deleteUserConfirmationModalBody}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => { setDeleteUserConfirmationModalShow(false) } }>{strings.usersTableCard.deleteUserConfirmationModalCancelButton}</Button>
                    <Button variant="danger" onClick={handleDeleteUserButtonClick}>{strings.usersTableCard.deleteUserConfirmationModalDeleteButton}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UsersTableCard;
