import JustValidate, { Rules } from 'just-validate'

import { delayMaybeError } from './utils'

const $formSubmitInfo = document.querySelector('#info')!

const PHONE_NUMBER_RU = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
const ALPHABET_RU = /^[а-яА-ЯёЁ\s]+$/g
const NORM_PHONE_NUMBER = /[^+\d]/g

const enum FormSubmitInfo {
	Succes = 'Форма отправлена успешно',
	Fail = 'Форма отправлена не успешно',
}

const requiredField = {
	rule: Rules.Required,
	errorMessage: 'Обязательное поле',
}

const succesSubmit = () => {
	$formSubmitInfo.classList.remove('error')
	$formSubmitInfo.textContent = FormSubmitInfo.Succes
}
const failSubmit = () => {
	$formSubmitInfo.classList.add('error')
	$formSubmitInfo.textContent = FormSubmitInfo.Fail
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

interface IUserData {
	userName: string
	userPhone: string
	userMsg: string
}

validate.onSuccess(async (e) => {
	const { userMsg, userName, userPhone } = (e as SubmitEvent)
		.currentTarget as HTMLFormElement

	const json: IUserData = {
		userMsg: userMsg.value,
		userName: userName.value,
		userPhone: userPhone.value.replace(NORM_PHONE_NUMBER, ''),
	}

	try {
		validate.lockForm()
		await delayMaybeError()
		succesSubmit()
	} catch (error) {
		failSubmit()
	} finally {
		validate.unlockForm()
	}
})
