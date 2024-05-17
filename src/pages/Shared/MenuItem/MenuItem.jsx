import React from "react"

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item
    return (
        <div className="flex">
            <img src={image} alt="" className="w-[118px] h-[104px] object-cover rounded-[200px] rounded-tl-none mr-8" />
            <div>
                <h3>{name}-----</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-[#BB8506]">${price}</p>
        </div>
    )
}

export default MenuItem
