import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [ keyword, setKeyword ] = useState('');
    const history = useNavigate();

    const searchHandler = (e)=>{
        e.preventDefault();

        if(keyword.trim()){
            history(`/search/${keyword}`);
        }
        else{
            history('/');
        }
    }

  return (
    <form onSubmit={searchHandler}>
      {/* Search-box */}
      <div className="col-12 col-md-6 mt-2 mt-md-0">
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Search for products, categories ..."
                    onChange={(e)=>setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                    {/* search icon from fontawesome */}
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default Search
