import React from "react"

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center mb-12">
            <p className="text-[#D99904] italic text-xl mb-4">---{subHeading}---</p>
            <h3 className="text-[var(--Dark-01,#151515)] text-[40px] uppercase mx-auto border-y-4 w-[424px]">{heading}</h3>
        </div>
    )
}

export default SectionTitle
