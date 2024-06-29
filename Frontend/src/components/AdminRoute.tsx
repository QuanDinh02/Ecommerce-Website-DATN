import { UserLogin } from "@/redux/actions/action";
import { fetchSysAccount } from "@/services/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import React from "react";

const AdminRoute = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAccountInfo = async () => {
        let result: any = await fetchSysAccount();

        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "admin") {
                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        username: userData.username,
                        role: userData.role,
                        shipping_unit_id: userData.shipping_unit_id
                    }
                }

                dispatch(UserLogin(data));
            }

            else {
                navigate("/fms/login");
            }
        } else {
            navigate("/fms/login");
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return <>{children}</>
}

export default AdminRoute;