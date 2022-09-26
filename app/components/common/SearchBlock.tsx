import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchBlock = (props: any) => {

    const route = useRouter();
    const [searchText, setSearchText] = useState<any>("")

    useEffect( () => {
        setSearchText(route.query.q)
        return () => {}
    },[route.query])

    return (
        <>
            <div
                className="searchbar position-relative"
                data-bs-toggle="modal"
                data-bs-target="#searchPopup"
            >
                <div className="input-group mb-4 search-field">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                        >
                            <path
                            fillRule="evenodd"
                            d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="form-control fs-12"
                        placeholder="Search"
                        aria-label="Kurtis"
                        aria-describedby="addon-wrapping"
                        value={searchText ?? ""}
                        onChange={ (e) => setSearchText(e.target.value)}
                        onClick={(event) => {
                            event.preventDefault();
                            props.setOpenSearchBox(true);
                        }}
                        readOnly={true}
                    />
                </div>
                {
                    searchText &&
                    <div className="result textlight">
                        Search results for <span>‘{searchText}’</span>
                    </div>
                }
            </div>
        </>
    )
}

export default SearchBlock;