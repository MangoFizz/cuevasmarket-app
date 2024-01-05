import { Button, Card, Form, InputGroup, ButtonGroup, Modal, Image } from "react-bootstrap";
import { strings } from "../localization";
import BootstrapTable from "react-bootstrap-table-next";
import { useEffect, useState } from "react";
import { ProductsServiceResult, addProductStock, deleteProduct, searchProducts, searchProductsStock } from "../services/products.service";
import "./ProductsTableCard.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { getLoggedUserStoreBranch } from "../helpers/loggedUser";

const BranchInventoryTableCard = () => {
    const [products, setProducts] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState({}); 
    const [viewProductDetailsModalShow, setViewProductDetailsModalShow] = useState(false);
    const [addProductModalShow, setAddProductModalShow] = useState(false);

    const [productsAmount, setProductsAmount] = useState(0);

    const branchesPerPage = 15;

    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchResults(searchQuery, currentPage);
    }, []);

    const fetchSearchResults = async (searchQuery, page) => {
        try {
            let r = await searchProductsStock(getLoggedUserStoreBranch().id, searchQuery, branchesPerPage, page);
            switch(r.result) {
                case ProductsServiceResult.Success: {
                    let responseData = r.data;
                    setProducts(responseData.results);
                    setCurrentPage(responseData.currentPage);
                    setTotalPages(responseData.totalPages);
                    return;
                }
                case ProductsServiceResult.UnknownError: {
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
        setProducts([]);
    };

    const handleProductSearchInputChange = async (e) => {
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

    const handleAddProductStockButtonClick = async () => {
        try {
            let r = await addProductStock(selectedProduct.id, getLoggedUserStoreBranch().id, productsAmount);
            switch(r.result) {
                case ProductsServiceResult.Success: {
                    setAddProductModalShow(false);
                    setProductsAmount(0);
                    setSelectedProduct({});
                    await fetchSearchResults(searchQuery, currentPage);
                    return;
                }
                case ProductsServiceResult.UnknownError: {
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
            console.log(`Failed to delete product: ${e}`);
        }
    }

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
                    <h5 style={{margin: "0"}}>{strings.branchInventoryManagement.header}</h5>
                    <div className="d-flex event-guests-button-bar">
                        <InputGroup>
                            <Form.Control placeholder={strings.branchInventoryManagement.searchBarPlaceholder} aria-label="Search" onChange={handleProductSearchInputChange}/>
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                        </InputGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <BootstrapTable 
                        keyField="id"
                        data={products}
                        hover={true}
                        striped={true}
                        rowClasses={"product-table-cell"}
                        columns={[
                            {
                                dataField: "barcode",
                                text: strings.productsTableCard.barcodeColumn,
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "name",
                                text: strings.productsTableCard.nameColumn
                            },
                            {
                                dataField: "price",
                                text: strings.productsTableCard.priceColumn,
                                formatter: (cell, row) => {
                                    return `$ ${cell.toFixed(2)}`;
                                },
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "stock",
                                text: strings.branchInventoryManagement.stockLabel,
                                classes: "hide-on-md",
                                headerClasses: "hide-on-md"
                            },
                            {
                                dataField: "options",
                                classes: "d-flex justify-content-center",
                                formatter: (cell, row, rowIndex, formatExtraData) => {
                                    return (
                                        <ButtonGroup>
                                            <Button variant="secondary" className="text-nowrap" onClick={() => { setSelectedProduct(row); setViewProductDetailsModalShow(true); }}><i className="bi bi-eye-fill"></i></Button>
                                            <Button variant="primary" className="text-nowrap" onClick={() => { setSelectedProduct(row); setAddProductModalShow(true) }}><i className="bi bi-plus-lg"></i></Button>
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
                    </div>
                </Card.Footer>
            </Card>

            <Modal show={viewProductDetailsModalShow} scrollable>
                <Modal.Header>
                    <Modal.Title>{strings.productsTableCard.viewProductDetailsModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalBarcodeLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedProduct.barcode}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalNameLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedProduct.name}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalPriceLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedProduct.price}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalCategoryLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedProduct.category}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalProviderLabel}</Form.Label>
                            <Form.Control type="text" readOnly value={selectedProduct.provider}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{strings.productsTableCard.viewProductDetailsModalImageLabel}</Form.Label>
                            <br />
                            <Image src={`${API_URL}/images/products/${selectedProduct.image}`} fluid/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setViewProductDetailsModalShow(false)}>{strings.productsTableCard.modalCloseButton}</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addProductModalShow}>
                <Modal.Header>
                    <Modal.Title>{strings.branchInventoryManagement.addProductModalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>{strings.branchInventoryManagement.amountLabel}</Form.Label>
                        <Form.Control type="number" value={productsAmount} onChange={(e) => { setProductsAmount(e.target.value) }}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => { setAddProductModalShow(false) } }>{strings.productsTableCard.deleteProductConfirmationModalCancelButton}</Button>
                    <Button variant="primary" onClick={handleAddProductStockButtonClick}>{strings.branchInventoryManagement.addButton}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BranchInventoryTableCard;
