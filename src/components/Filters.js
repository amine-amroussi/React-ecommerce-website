import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters,
    updateFilters,
    clearFilters,
    all_products
  } = useFilterContext()

  const categories = getUniqueValues(all_products , "category")
  const companies = getUniqueValues(all_products , "company")
  const colors = getUniqueValues(all_products , "colors")

  const {color , text , category , company , max_price , min_price , price , shipping } = filters;

  return <Wrapper>
    <div className="content" >
      <form onSubmit={e => e.preventDefault()} >
        {/* search input */}
          <div className="form-control" >
            <input type="search" name = "text" placeholder='search' className="search-input" value={text} onChange={updateFilters} />
          </div>
        {/* end of search  */}
        {/* categories */}
          <div className="form-control" >
            <h5>category</h5>
            <div>
              {
                categories.map((cat , index) => {
                  return <button key={index}
                  onClick={updateFilters}
                  name="category"
                  type="button"
                  className={`${
                    category === cat.toLowerCase() ? "active" : null
                  }`}
                  >{cat}</button>
                })
              }
            </div>
          </div>
        {/* end of categories */}

        {/* Companies */}
        <div className="form-control" >
          <h5>company</h5>
          <select name="company" className="company" value={company} onChange={updateFilters} 
            
          >
            {companies.map((comp , index) => {
              return <option value={comp} key={index} > {comp} </option>
            })}
          </select>
        </div>
        {/* end of Companies */}

        {/* Colors */}
            <div className="form-control" >
              <h5>Color</h5>
              <div className="colors" >
                {
                  colors.map((clr , index) => {
                    if (clr === "all") {
                     return <button name="color" data-color="all" onClick={updateFilters} key={index}
                      className={color === "all" ? "active all-btn" : "all-btn"}
                      >All</button>
                    }
                    return <button  name="color" className={`${clr === color ? "active color-btn " : "color-btn"}`} data-color={clr} key={index} style={{background : clr}} 
                      onClick={updateFilters}
                    > {clr === color && <FaCheck /> } </button>
                  })
                }
              </div>
            </div>
        {/* end of Colors */}

        {/* Price */}

        <div className="form-control" >
          <h5>Price</h5>
          <p className="price" > {formatPrice(price)} </p>
          <input type="range" name="price" onChange={updateFilters} min={min_price} max={max_price} value={price} />
        </div>

        {/* end of Price */}

        {/* Shipping */}
        <div className="form-control shipping" >
          <label htmlFor="shipping" >Free shipping</label>
          <input type="checkbox" name="shipping" id="shipping" onChange={updateFilters} checked={shipping} />
        </div>
        {/* end of Shipping */}
      </form>
      <button className="clear-btn" onClick={clearFilters} >clear filters</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
