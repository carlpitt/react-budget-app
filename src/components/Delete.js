import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://159.203.118.58:5000";

function Delete() {
    const navigate = useNavigate();
    const { userId, budgetId } = useParams();

    // deletion api
    useEffect(() => {
        console.log(`Attempt to delete budgetId: ${budgetId}`);
        const deleteBudget = async () => {
            try {
                await Axios.delete(
                    `${url}/delete/${userId}/${budgetId}`,
                );
                console.log("Budget item is deleted: ");
                navigate("/dashboard");
            } catch (error) {
                console.error(`Error deleting budget: ${error}`);
            }
        };
        deleteBudget();
    }, [navigate, userId, budgetId]);
    return <div>Delete budget</div>;
}

export default Delete;
