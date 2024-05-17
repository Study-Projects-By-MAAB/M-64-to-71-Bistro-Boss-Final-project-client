import React from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import featuredImg from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item bg-fixed bg-no-repeat bg-cover">
            <div className="bg-[#151515B2] pt-12">
                <SectionTitle subHeading={"Check it out"} heading={"From our menu"}></SectionTitle>
                <div className="md:flex justify-center items-center pb-12 px-52 ">
                    <div>
                        <img src={featuredImg} alt="" />
                    </div>
                    <div className="md:ml-10 text-white">
                        <p>Aug, 20, 2029</p>
                        <p className="uppercase">Where can i get some?</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, aperiam? Sint dolores rem eveniet
                            consectetur doloremque quibusdam dignissimos libero doloribus sit ullam quo, esse, incidunt ea
                            eligendi suscipit fugiat magni maiores nam quis accusantium sunt nesciunt. Placeat nisi commodi
                            expedita et voluptatibus iure. Officia voluptatibus veritatis et est maiores quas?
                        </p>
                        <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
