import React, { Component } from 'react'

import PageHeader from '../template/pageHeader'

export default class About extends Component
{
    render()
    {
        return (
            <div>
                <PageHeader name="Sobre" small="Nós" />
                
                <h2>Nossa história</h2>
                <p>Lorem ipsum dolor sit amet...</p>

                <h2>Missão, visão e valor</h2>
                <p>Lorem ipsum dolor sit amet...</p>

                <h2>Imprensa</h2>
                <p>Lorem ipsum dolor sit amet...</p>
            </div>
        );
    }
}