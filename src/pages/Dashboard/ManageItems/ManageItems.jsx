import React from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import useMenu from "../../../hooks/useMenu"
import { FaEdit, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Link } from "react-router-dom"

const ManageItems = () => {
    const [menu, , refetch] = useMenu()

    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted.`,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            }
        })
    }

    return (
        <div>
            <SectionTitle heading={"Manage All Items"} subHeading={"Hurry up"}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, idx) => (
                                <tr key={item._id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="text-right">${item.price}</td>
                                    <td>
                                        <Link
                                            to={`/dashboard/updateItem/${item._id}`}
                                            className="btn bg-orange-500 btn-ghost btn-lg text-white"
                                        >
                                            <FaEdit></FaEdit>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg text-red-500"
                                        >
                                            <FaTrash></FaTrash>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageItems
