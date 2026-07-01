import { useEffect, useState } from "react";
import "./AdminUsersPage.css";

export default function AdminUsersPage () {

    const [ users, setUsers ] = useState( [] );

    useEffect( () => {

        // later api call

        setUsers( [
            {
                _id: "1",
                name: "Mahdi",
                email: "mahdi@gmail.com",
                role: "admin",
            },
            {
                _id: "2",
                name: "Ali",
                email: "ali@gmail.com",
                role: "user",
            },
        ] );

    }, [] );

    return (
        <div className="admin-users">

            <div className="admin-users__header">

                <h1>مدیریت کاربران</h1>

            </div>

            <div className="users-table-wrapper">

                <table className="users-table">

                    <thead>
                        <tr>
                            <th>نام</th>
                            <th>ایمیل</th>
                            <th>نقش</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>

                    <tbody>

                        { users.map( ( user ) => (

                            <tr key={ user._id }>

                                <td>{ user.name }</td>

                                <td>{ user.email }</td>

                                <td>
                                    <span
                                        className={
                                            user.role === "admin"
                                                ? "role admin"
                                                : "role user"
                                        }
                                    >
                                        { user.role }
                                    </span>
                                </td>

                                <td>

                                    <button className="action-btn edit">
                                        تغییر نقش
                                    </button>

                                    <button className="action-btn delete">
                                        حذف
                                    </button>

                                </td>

                            </tr>

                        ) ) }

                    </tbody>

                </table>

            </div>

        </div>
    );
}
