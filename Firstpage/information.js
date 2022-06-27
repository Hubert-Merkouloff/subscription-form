import React, { Fragment } from 'react'

export default class Information extends React.Component {

  render() {

    return (
      <Fragment>
        <div className='background-1'>
          <div className='d-flex h-100 w-100 align-items-center flex-column justify-content-between'>
            <header>
              <img src="/images/logo/logo-hop3team.png" className="logo" alt="" />
            </header>
            <div className='d-flex flex-column'>
              <div className="item d-flex align-items-center mb-4">
                <div className="logo-frame me-3 p-2">
                  <img className="logo-mainpage" src="/images/icons/Hop3team_Benefices_Optimisationtemps.png" alt="timeoptimiser" />
                </div>
                <p className="body1"> <strong className='fw-bold'>Optimisez</strong> vos processus administratifs</p>
              </div>
              <div className="item d-flex align-items-center mb-4">
                <div className="logo-frame me-3 p-2">
                  <img className="logo-mainpage" src="/images/icons/Hop3team_Benefices_Gestion.png" alt="timeoptimiser" />
                </div>
                <p className="body1"> <strong className='fw-bold'>Pilotez</strong> votre certification <strong className='fw-bolder'>Qualiopi</strong></p>
              </div>
              <div className="item d-flex align-items-center mb-4">
                <div className="logo-frame me-3 p-2">
                  <img className="logo-mainpage" src="/images/icons/Hop3team_Benefices_Dashboard.png" alt="timeoptimiser" />
                </div>
                <p className="body1"> <strong className='fw-bold'>Automatisez</strong> les tâches sans plus-value </p>
              </div>
              <div className="item d-flex align-items-center mb-4">
                <div className="logo-frame me-3 p-2">
                  <img className="logo-mainpage" src="/images/icons/Hop3team_Fonctionnalites_BPF.png" alt="timeoptimiser" />
                </div>
                <p className="body1"> Mettez <strong className='fw-bold'>toutes vos données au même endroit</strong> </p>
              </div>
              <div className="item d-flex align-items-center mb-4">
                <div className="logo-frame me-3 p-2">
                  <img className="logo-mainpage" src="/images/icons/Hop3team_Fonctionnalites_GEDrgpd.png" alt="timeoptimiser" />
                </div>
                <p className="body1"> Sécurisez toutes vos actions dans <strong className='fw-bold'>un seul logiciel</strong></p>
              </div>
            </div>
            <div className="help-section d-flex flex-column">
              <button className='help-button bg-white mb-3 me-3' type="button" onClick={this.previous}>
                <img src="/images/icons/telephone-icon.png" width={30} height={30} alt="icone telephone"/>
              </button>
              <button className='help-button me-3' type="button" onClick={this.previous}>Besoin d'aide ?</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

}
