import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import createFocusDecorator from 'final-form-focus'
import api from 'api'
import BubbleProgressBar from '../ProgressBar/BubbleProgressBar'

const focusOnError = createFocusDecorator()
const calculator = createDecorator(
  {
    field: 'siret', // when minimum changes...
    updates: {
      // ...update the total to the result of this function
      company: async(siretValue) => {
        if (siretValue && siretValue.length === 14) {

          try {
            const response = await api.findCompanyWithSiret(siretValue)

            return response.company
          } catch (e) {
            return null
          }
        }
        return null
      },
    },
  },
  {
    field: 'companyName', // when minimum changes...
    updates: {
      domain: (companyName) => {
        if (companyName) {
          return companyName.replace(/[^a-zA-Z0-9 \-]/g, '').replace(' ', '-').replace(/--+/g, '-')
        }
      },
    },
  },
  {
    field: 'structure', // when minimum changes...
    updates: {
      prices: async(structure) => await api.fetchPrice(structure).then(response => response.prices),
    },
  },
  {
    field: 'domain',
    updates: {
      // ...update the total to the result of this function
      domain: (domainValue) => {
        if (domainValue) {
          if (domainValue.startsWith('-')) domainValue = domainValue.substring(1)
          return domainValue.replace(/[^a-zA-Z0-9 \-]/g, '').replace(' ', '-').replace(/--+/g, '-').toLowerCase()
        }
        return domainValue
      },
    },
  },
)

export default class Wizard extends React.Component {

  constructor(props) {
    super(props)
    const index = 0

    this.state = {
      page: index,
      rightActivePage: props.rightSteps[index],
      leftActivePage: props.leftSteps[index],
      values: props.initialValues || {},
      isDisabled: false,
      error: null,
    }
  }

  handleSubmit = values => {
    const { rightSteps } = this.props
    const { page } = this.state
    const isLastPage = page === rightSteps.length - 1

    if (isLastPage) {
      window.location.href = values.stripe_url
    } else {
      this.next(values)
    }
  }


  next = values => {
    const { rightSteps, leftSteps } = this.props
    const { page } = this.state
    const newPage = Math.min(page + 1, rightSteps.length - 1)


    this.setState({
      page: newPage,
      rightActivePage: rightSteps[newPage],
      leftActivePage: leftSteps[newPage],
      values,
    })
  }




  previous = () => {
    const { rightSteps, leftSteps } = this.props
    const { page } = this.state
    const currentPage = Math.max(page - 1, 0)


    this.setState({
      page: currentPage,
      rightActivePage: rightSteps[currentPage],
      leftActivePage: leftSteps[currentPage],
    })
  }

  /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

  validate = values => {
    const { rightActivePage, isDisabled } = this.state

    if (rightActivePage.validate)
      return rightActivePage.validate(values).then((errors) => {
        const newState = !isEmpty(errors)

        newState !== isDisabled && this.setState({ isDisabled: newState })
        return(errors)
      })
    return {}
  }

  render() {

    const { values, rightActivePage: RightActivePage, leftActivePage: LeftActivePage, page, isDisabled, error } = this.state
    const { rightSteps: { length: numberOfSteps } } = this.props

    return (

      <div className='d-flex h-100'>
        <div className="left-container h-100">
          <LeftActivePage />
        </div>
        <div className="right-container">
          <h2 className='mb-4'>Souscription</h2>
          <div className='mb-3'>
            <BubbleProgressBar
              numberOfSteps={numberOfSteps}
              currentStep={page}
            />
          </div>
          <Form
            mutators={{
              setStripeCustomer: (args, state, utils) => {
                const values = state.formState.values

                api.createCustomerStripe({ email: values.email, first_name: values.firstName, last_name: values.lastName }).then(response => {
                  utils.changeValue(state, 'stripe_id', () => response.id)
                })
              },
            }}
            decorators={[focusOnError, calculator]}
            initialValues={values}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          >
            {({ form, handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit} className="d-flex w-100">

                <RightActivePage
                  previous={this.previous}
                  mutators={form.mutators}
                  values={values}
                  submitting={submitting}
                  form={form}
                />
                <img className='position-arrow' src="/assets/images/icons8-transfer-60.png" alt="" />

                <div className='position-buttons'>
                  {(page>0) && (<button className='button button--secondary back-button' type="button" onClick={this.previous}>Retour</button>)}
                  <button className='button button--main-purple next-button' type="submit" disabled={isDisabled || error}>Suivant</button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>

    )
  }

}

Wizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
