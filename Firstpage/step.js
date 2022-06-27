import React, { Fragment } from 'react'
import { Field } from 'react-final-form'
import { InputText,RadioButton } from 'react-app/components-final-form'
import api from 'api'

const required = value => (value ? undefined : 'Requis')


export default class Step extends React.Component {

  static checkEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  }

  static validate = async values => {
    const errors = {}

    if (!values.firstName) {
      errors.firstName = 'Requis'
    }
    if (!values.companyName) {
      errors.companyName = 'Requis'
    }
    if (!values.lastName) {
      errors.lastName = 'Requis'
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Requis'
    }
    if (!values.email) {
      errors.email = 'Requis'
    } else {
      if(!this.checkEmail(values.email)) {
        errors.email = 'Adresse email invalide'
      } else {
        const response = await api.checkCustomerEmail(values.email)

        if (response.exists)
          errors.email = 'Email déjà renseigné. Veuillez vous rapprochez du service client'
      }

    }
    if (!values.domain) {
      errors.domain = 'Requis'
    } else {
      const response = await api.fetchTenantsList({ 'q[hostname_eq]': values.domain + '.hop3team.com' })

      if (response.tenants.length > 0) errors.domain = 'Nom de domain déjà existant'
    }
    if (!values.structure) {
      errors.structure = 'Requis'
    }


    return errors
  }

  constructor(props) {
    super(props)
    this.state = {
      sellsy_prospect_id: null,
      loading: false,
      success: false,
    }
  }

  render() {

    return (
      <Fragment>
        <div className='d-flex flex-column w-100'>
          <div className='mb-4'>
            <h3 className='mb-2'> Dîtes-nous qui vous êtes: </h3>
            <div className='d-flex mb-2'>
              <Field
                title="Raison sociale"
                name="companyName"
                component={InputText}
                type="text"
                validate={required}
                required
              />
            </div>
            <div className='d-flex mb-2 account-section'>
              <div className='flex-grow account-field'>
                <Field
                  title="Prénom"
                  name="firstName"
                  component={InputText}
                  type="text"
                  validate={required}
                  required
                />
              </div>
              <div className='flex-grow'>
                <Field
                  title="Nom"
                  name="lastName"
                  component={InputText}
                  type="text"
                  validate={required}
                  required
                />
              </div>
            </div>
            <div className='d-flex account-section'>
              <div className='flex-grow email-box account-field'>
                <Field
                  title="Email"
                  name="email"
                  component={InputText}
                  type="text"
                  validate={required}
                  required
                />
              </div>
              <div className='flex-grow'>
                <Field
                  title="Téléphone"
                  name="phoneNumber"
                  component={InputText}
                  type="tel"
                  placeholder=""
                  validate={required}
                  required
                />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <h3 className='mb-2'> Choisissez l'adresse de votre logiciel (URL)</h3>
            <div className='d-flex mb-2'>
              <Field
                title="Nom de domaine"
                name="domain"
                component={InputText}
                placeholder="mon-site"
                suffixe=".hop3team.com"
                type="text"
                size="15"
                validate={required}
              />
            </div>
          </div>
          <div className='mb-3'>
            <h3 className='mb-2'> Déterminez votre tarif en un clic ! </h3>
            <p className='callout1'>Les informations suivantes vont nous permettre de vous <br/> proposer les meilleures offres au bon tarif !</p>
          </div>
          <div className='mb-4'>
            <h3 className='mb-2'> Quelle est la structure juridique de votre société ?*</h3>
            <div className='d-flex flex-column'>
              <Field
                name="structure"
                id="unipersonnelle"
                className="radio-custom"
                labelClassName="radio-custom-label"
                value="solo"
                type="radio"
                component={RadioButton}
                required
              >
                <div className="d-flex flex-column">
                  <span className='fw-bold mb-1'>Consultant / Formateur / Indépendant </span>
                  <p className='callout1'>(Auto-entrepreneur, micro-entreprise, EI, EURL, SASU...) </p>
                </div>
              </Field>
              <Field
                name="structure"
                id="entreprise-formation"
                className="radio-custom"
                labelClassName="radio-custom-label"
                value="of"
                type="radio"
                component={RadioButton}
              >
                <div className="d-flex flex-column">
                  <span className='fw-bold mb-1'>Entreprise de formation </span>
                  <p className='callout1'> (SARL, SAS, groupe, holding...) </p>
                </div>
              </Field>
              <Field
                name="structure"
                id="association"
                className="radio-custom"
                labelClassName="radio-custom-label"
                value="asso"
                type="radio"
                component={RadioButton}
              >
                <div className="d-flex flex-column">
                  <span className='fw-bold'>Association </span>
                  <p className='callout1'>(de type loi de 1901)</p>
                </div>
              </Field>
            </div>
          </div>
          <div className='mb-4'>
            <div className='mb-3'>
              <Field
                title="Numéro de siret"
                name="siret_number"
                component={InputText}
                type="text"
                placeholder=""
              />
            </div>
          </div>
          <div className="rotate-text">
            <p>Encore 2 clics et <br></br>vous pourrez profitez de votre </p>
            <p className='fw-bold'>essai gratuit de 14 jours</p>
          </div>
        </div>
      </Fragment>
    )
  }

}
