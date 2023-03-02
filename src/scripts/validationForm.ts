import JustValidate, { Rules } from 'just-validate'

import { onSubmitForm } from './onSubmitForm'

const PHONE_NUMBER_RU = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
const ALPHABET_RU = /^[а-яА-ЯёЁ\s]+$/g

const requiredField = {
	rule: Rules.Required,
	errorMessage: 'Обязательное поле',
}

const validate = new JustValidate('#form')
validate
	.addField('#user-name', [
		requiredField,
		{
			rule: Rules.CustomRegexp,
			value: ALPHABET_RU,
			errorMessage: 'Введите буквы русского алфавита',
		},
	])
	.addField('#user-phone', [
		requiredField,
		{
			rule: Rules.CustomRegexp,
			value: PHONE_NUMBER_RU,
			errorMessage: 'Введите номер правильно',
		},
	])
	.addField('#user-msg', [requiredField])

validate.onSuccess(onSubmitForm(validate))
