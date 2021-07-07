import React from 'react'
import { Link } from 'react-router-dom'

function VehicleCard({ vehicle }) {

    return (
        <div className="card">
            <p className="card-header">
                Vehicle Item
            </p>
            <div className="card-body">
                <h5 className="card-title">License Plate: {vehicle.licenseplate}</h5>
                <p className="card-text">Finorvin: {vehicle.finorvin}</p>
                <Link to={`/vehicles/${vehicle._id}`} className="btn btn-primary">Go to Details </Link>
            </div>
            <div className="card-footer text-muted">{vehicle.createdAt}</div>
        </div>
    )

}

export default VehicleCard
