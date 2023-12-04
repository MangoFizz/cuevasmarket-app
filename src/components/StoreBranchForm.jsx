import { useEffect } from "react";
import { Modal } from "react-bootstrap"

const NewStoreBranchForm = ({ getShowModal }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(getShowModal) {
            getShowModal(setShow);
        }
    }, []);

    return (
        <Modal>

        </Modal>
    )
}
