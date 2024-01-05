const es = {
    name: "Español",
    locale: "es-MX",
    strings: {
        common: {
            unknownError: "Ha ocurrido un error desconocido."
        },

        navbar: {
            home: "Inicio",
            about: "Acerca de",
            contact: "Contacto",
            login: "Iniciar sesión",
            logout: "Cerrar sesión"
        },

        adminSidebar: {
            storeBranches: "Sucursales",
            products: "Productos",
            users: "Usuarios",
            signOut: "Cerrar sesión"
        },

        loginForm: {
            header: "INICIAR SESIÓN",
            usernameLabel: "Nombre de usuario",
            passwordLabel: "Contraseña",
            submitButtonLabel: "Iniciar sesión",
            usernameRequired: "Por favor, ingrese su número de teléfono.",
            usernameInvalid: "Por favor, ingrese un número de teléfono válida.",
            passwordRequired: "Por favor, ingrese su contraseña.",
            invalidCredentials: "Credenciales no válidas.",
            tooManyAttempts: "Demasiados intentos. Por favor, inténtelo de nuevo más tarde."
        },

        storeBranchesList: {
            registerNewStoreBranch: "Nueva sucursal",
            searchBarPlaceholder: "Buscar sucursal...",
            noResults: "No se encontraron resultados",
        },

        storeBranchesManagement: {
            header: "Administración de sucursales",
        },

        storeBranchForm: {
            header: "Nueva sucursal",
            altHeader: "Editar sucursal",
            nameLabel: "Nombre",
            addressLabel: "Dirección",
            submitButtonLabel: "Registrar",
            nameRequired: "Por favor, ingrese el nombre de la sucursal.",
            nameTooShort: "El nombre de la sucursal es demasiado corto.",
            nameTooLong: "El nombre de la sucursal es demasiado largo.",
            addressRequired: "Por favor, ingrese la dirección de la sucursal.",
            openingTimeLabel: "Hora de apertura",
            openingTimeRequired: "Por favor, ingrese la hora de apertura de la sucursal.",
            closingTimeLabel: "Hora de cierre",
            closingTimeRequired: "Por favor, ingrese la hora de cierre de la sucursal.",
            storeBranchRegistered: "Sucursal registrada.",
            storeBranchNotRegistered: "No se pudo registrar la sucursal.",
            registerButton: "Aceptar",
            cancelButton: "Cancelar",
            alreadyExists: "Ya existe una sucursal con ese nombre."
        },

        productManagement: {
            header: "Administración de productos",
            registerNewProduct: "Nuevo producto",
            searchBarPlaceholder: "Buscar producto...",
            noResults: "No se encontraron resultados",
        },

        productsTableCard: {
            header: "Productos",
            searchBarPlaceholder: "Buscar producto...",
            barcodeColumn: "Código",
            nameColumn: "Nombre",
            priceColumn: "Precio",
            categoryColumn: "Categoría",
            providerColumn: "Proveedor",
            addProductButton: "Agregar producto",
            modalCloseButton: "Cerrar",
            viewProductDetailsModalTitle: "Detalles del producto",
            viewProductDetailsModalBarcodeLabel: "Código",
            viewProductDetailsModalNameLabel: "Nombre",
            viewProductDetailsModalPriceLabel: "Precio",
            viewProductDetailsModalProviderLabel: "Proveedor",
            viewProductDetailsModalCategoryLabel: "Categoría",
            viewProductDetailsModalImageLabel: "Imagen",
            deleteProductConfirmationModalHeader: "Eliminar producto",
            deleteProductConfirmationModalBody: "¿Está seguro que desea eliminar este producto?",
            deleteProductConfirmationModalCancelButton: "Cancelar",
            deleteProductConfirmationModalDeleteButton: "Eliminar",
        },

        registerProduct: {
            header: "Registrar producto",
            requestError: "No se pudo registrar el producto.",
            unknownError: "Ha ocurrido un error desconocido.",
            alreadyExists: "Ya existe un producto con ese código.",
            header: "Registrar producto",
            altHeader: "Editar producto",
            nameLabel: "Nombre",
            namePlaceholder: "Nombre del producto",
            nameRequired: "Por favor, ingrese el nombre del producto.",
            barcodeLabel: "Código",
            barcodePlaceholder: "Código del producto",
            barcodeRequired: "Por favor, ingrese el código del producto.",
            decriptionLabel: "Descripción",
            descriptionPlaceholder: "Descripción del producto",
            descriptionRequired: "Por favor, ingrese la descripción del producto.",
            priceLabel: "Precio",
            pricePlaceholder: "Precio del producto",
            priceRequired: "Por favor, ingrese el precio del producto.",
            providerLabel: "Proveedor",
            providerPlaceholder: "Proveedor del producto",
            providerRequired: "Por favor, ingrese el proveedor del producto.",
            categoryLabel: "Categoría",
            categoryRequired: "Por favor, ingrese la categoría del producto.",
            registerButton: "Aceptar",
            cancelButton: "Cancelar",
            imageLabel: "Imagen"
        }
    }
}

export default es;
