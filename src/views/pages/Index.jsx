import React, { Component } from 'react'
import QA from '../components/QA'

export default class Index extends Component {
    render() {
        return (
            <div className="sayfa">
                <div className="row">
                    <div className="col-lg-6 p-0">
                        <div className="mini-title mb-3">Quick Actions</div>
                        <div className="mini-container">
                            <QA
                            src="icons/low-gas-red.svg"
                            title="Tire Presuare"
                            status="Low"
                            color="#F64E60"
                            />

                            <QA
                            src="icons/service-green.svg"
                            title="Tire Presuare"
                            status="Running"
                            color="#3DCC7A"
                            />

<QA
                            src="icons/battery-green.svg"
                            title="Tire Presuare"
                            status="Low"
                            color="#F64E60"
                            />

                            
<QA
                            src="icons/service-red.svg"
                            title="Tire Presuare"
                            status="Low"
                            color="#F64E60"
                            />

                            
<QA
                            src="icons/low-gas-green.svg"
                            title="Tire Presuare"
                            status="Low"
                            color="#F64E60"
                            />

                            
<QA
                            src="icons/low-gas-red.svg"
                            title="Tire Presuare"
                            status="Low"
                            color="#F64E60"
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 p-0">

                    </div>
                </div>
            </div>
        )
    }
}
