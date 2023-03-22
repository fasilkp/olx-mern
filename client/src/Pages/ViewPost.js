import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'

function ViewPost(props) {
    const {id}=useParams();
    return (
        <div>
            <Header />
            <View id={id} />
        </div>
    )
}

export default ViewPost
