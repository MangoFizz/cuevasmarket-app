import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { strings } from "../localization";
import { Button, Card, Form } from "react-bootstrap";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../config";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { StoreBranchesSearchResult, getStoreBranch, registerStoreBranch, updateStoreBranch } from "../services/storebranches.service";
import "./StoreBranchFormCard.css";
import { ProductsServiceResult, getProduct, registerProduct, updateProduct } from "../services/products.service";

const categories = [
    "Alimentos secos",
    "Alimentos enlatados",
    "Bebidas",
    "Productos frescos",
    "Alimentos congelados",
    "Carne y mariscos",
    "Productos de limpieza",
    "Cuidado personal",
    "Snacks y dulces",
    "Alcohol"
];  

const ProductFormCard = ({ productId = null }) => {
    const [barcode, setBarcode] = useState("");
    const [barcodeIsInvalid, setBarcodeIsInvalid] = useState(false);
    const [name, setName] = useState("");
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionIsInvalid, setDescriptionIsInvalid] = useState(false);
    const [price, setPrice] = useState("");
    const [priceIsInvalid, setPriceIsInvalid] = useState(false);
    const [provider, setProvider] = useState("");
    const [providerIsInvalid, setProviderIsInvalid] = useState(false);
    const [category, setCategory] = useState("");
    const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
    const [image, setImage] = useState(null);
    const [imageIsInvalid, setImageIsInvalid] = useState(false);
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if(productId !== null) {
            getProduct(productId).then((res) => {
                let product = res.data;
                switch(res.result) {
                    case StoreBranchesSearchResult.Success: {
                        setBarcode(product.barcode);
                        setName(product.name);
                        setDescription(product.description);
                        setPrice(product.price);
                        setProvider(product.provider);
                        setCategory(product.category);
                        setImage(product.image);
                        break;
                    }
                    
                    case StoreBranchesSearchResult.RequestError: {
                        setFormError(strings.registerProduct.requestError);
                        console.log(product.data);
                        break;
                    }
    
                    default: {
                        setFormError(strings.registerProduct.unknownError);
                        break;
                    }
                }
            });
        }
    }, []);

    const handleRegisterButton = () => {
        let formValid = true;
        setFormError("");
        setBarcodeIsInvalid(false);
        setNameIsInvalid(false);
        setDescriptionIsInvalid(false);
        setPriceIsInvalid(false);
        setProviderIsInvalid(false);
        setCategoryIsInvalid(false);
        setImageIsInvalid(false);

        if(barcode === "") {
            setBarcodeIsInvalid(true);
            formValid = false;
        }
        else if(barcode.length != 13) {
            setBarcodeIsInvalid(true);
            formValid = false;
        }

        if(name === "") {
            setNameIsInvalid(true);
            formValid = false;
        }
        else if(name.length < 4) {
            setNameIsInvalid(true);
            formValid = false;
        }
        else if(name.length > 100) {
            setNameIsInvalid(true);
            formValid = false;
        }

        if(description === "") {
            setDescriptionIsInvalid(true);
            formValid = false;
        }
        else if(description.length < 4) {
            setDescriptionIsInvalid(true);
            formValid = false;
        }
        else if(description.length > 1000) {
            setDescriptionIsInvalid(true);
            formValid = false;
        }

        // check if price is a valid number
        if(price === "") {
            setPriceIsInvalid(true);
            formValid = false;
        }
        else if(isNaN(price)) {
            setPriceIsInvalid(true);
            formValid = false;
        }
        else if(price < 0) {
            setPriceIsInvalid(true);
            formValid = false;
        }

        if(provider === "") {
            setProviderIsInvalid(true);
            formValid = false;
        }

        if(category === "") {
            setCategoryIsInvalid(true);
            formValid = false;
        }


        if(formValid) {
            if(productId === null) {
                doRegisterProduct();
            }
            else {
                doUpdateProduct();
            }
        }
    }

    const handleCancelButton = () => {
        navigate("/admin/productos");
    }

    const doRegisterProduct = async () => {
        let registerResult = await registerProduct(barcode, name, description, price, provider, category, image);
        switch(registerResult.result) {
            case ProductsServiceResult.Success: {
                navigate("/admin/productos");
                return;
            }
            case ProductsServiceResult.RequestError: {
                setFormError(strings.registerProduct.requestError);
                return;
            }
            case ProductsServiceResult.AlreadyExists: {
                setFormError(strings.registerProduct.alreadyExists);
                return;
            }
            case ProductsServiceResult.UnknownError: {
                setFormError(strings.registerProduct.unknownError);
                return;
            }
            default: {
                setFormError(strings.registerProduct.unknownError);
                return;
            }
        }
    }

    const doUpdateProduct = async () => {
        let updateResult = await updateProduct(productId, barcode, name, description, price, provider, category, image);
        switch(updateResult.result) {
            case ProductsServiceResult.Success: {
                navigate("/admin/productos");
                return;
            }
            case ProductsServiceResult.RequestError: {
                setFormError(strings.registerProduct.requestError);
                return;
            }
            case ProductsServiceResult.UnknownError: {
                setFormError(strings.registerProduct.unknownError);
                return;
            }
            default: {
                setFormError(strings.registerProduct.unknownError);
                return;
            }
        }
    }

    return ( 
        <div className="store-branch-form-card">
            <Card>
                <Card.Header>
                    <h5>{productId === null ? strings.registerProduct.header : strings.registerProduct.altHeader}</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="barcodeInput">
                            <Form.Label>{strings.registerProduct.barcodeLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerProduct.barcodePlaceholder} value={barcode} onChange={(e) => setBarcode(e.target.value)} isInvalid={barcodeIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.barcodeRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="nameInput">
                            <Form.Label>{strings.registerProduct.nameLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerProduct.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} isInvalid={nameIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.nameRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionTextarea">
                            <Form.Label>{strings.registerProduct.decriptionLabel}</Form.Label>
                            <Form.Control type="textarea" placeholder={strings.registerProduct.descriptionPlaceholder} value={description} onChange={(e) => setDescription(e.target.value)} isInvalid={descriptionIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.descriptionRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="priceInput">
                            <Form.Label>{strings.registerProduct.priceLabel}</Form.Label>
                            <Form.Control type="number" placeholder={strings.registerProduct.pricePlaceholder} value={price} onChange={(e) => setPrice(e.target.value)} isInvalid={priceIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.priceRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="providerInput">
                            <Form.Label>{strings.registerProduct.providerLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerProduct.providerPlaceholder} value={provider} onChange={(e) => setProvider(e.target.value)} isInvalid={providerIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.providerRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="categorySelectInput">
                            <Form.Label>{strings.registerProduct.categoryLabel}</Form.Label>
                            <Form.Select onChange={(e) => setCategory(e.target.value)} isInvalid={categoryIsInvalid}>
                                {categories.map((category) => {
                                    return <option value={category}>{category}</option>
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.categoryRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="providerInput">
                            <Form.Label>{strings.registerProduct.imageLabel}</Form.Label>
                            <Form.Control type="file" onChange={ev => { setImage(ev.target.files[0]); }} isInvalid={imageIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerProduct.providerRequired}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <div className="form-error flex-grow-1" >{formError}</div>
                </Card.Body>
                <Card.Footer>
                    <div className="form-button-bar d-flex justify-content-end align-items-center flex-wrap-reverse">
                        <div className="form-buttons flex-shrink-0">
                            <Button className="btn btn-primary" onClick={handleRegisterButton}>{strings.storeBranchForm.registerButton}</Button>
                            <Button className="btn btn-secondary" onClick={handleCancelButton}>{strings.storeBranchForm.cancelButton}</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default ProductFormCard;
