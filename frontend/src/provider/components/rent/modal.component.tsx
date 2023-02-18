import Spinner from "../spinner/spinner.component";

const RentModal = ({ rentInfo }: any) => {
    console.log(rentInfo);

    return (
        <div className="container mt-3">
            <div className="modal fade" id="rentModal" aria-labelledby="rentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="rentModalLabel">Rent info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {
                            rentInfo ?
                                <div className="modal-body">
                                    ...
                                </div>
                                :
                                <div className="modal-body">
                                    Loading...
                                </div>
                        }
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default RentModal;