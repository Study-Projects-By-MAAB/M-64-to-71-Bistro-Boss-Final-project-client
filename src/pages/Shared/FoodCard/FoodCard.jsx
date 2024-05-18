import React from "react"

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={image} />
            </figure>
            <p className="absolute right-0 mt-4 mr-4 px-4 py-3 bg-sky-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4 border-[#BB8506] text-[#BB8506] uppercase">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard
