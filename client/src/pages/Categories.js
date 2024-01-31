import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {

    const categories = useCategory();


    return (
        <Layout title={"All Categories"}>
            <h1>All Categories</h1>

            <div className="container">
                <div className="row">
                    {
                        categories.map((c) => (
                            <div className="col-md-6">

                                <Link
                                key={c._id}
                                 className='btn btn-primary text-color m-2'

                                    to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>


                            </div>
                        ))
                    }
                </div>
            </div>

        </Layout>
    )
}

export default Categories