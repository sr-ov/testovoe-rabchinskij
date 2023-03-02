import axios from 'redaxios'
import JustValidate from 'just-validate'
import mime from 'mime-lite'

const $formSubmitInfo = document.querySelector('#info')!
const NORM_PHONE_NUMBER = /[^+\d]/g

interface IUserData {
	userName: string
	userPhone: string
	userMsg: string
}

const enum FormSubmitInfo {
	Succes = 'Форма отправлена успешно',
	Fail = 'Форма отправлена не успешно',
}

const succesSubmit = () => {
	$formSubmitInfo.classList.remove('error')
	$formSubmitInfo.textContent = FormSubmitInfo.Succes
}

const failSubmit = () => {
	$formSubmitInfo.classList.add('error')
	$formSubmitInfo.textContent = FormSubmitInfo.Fail
}

const sendUserData = async (json: IUserData) => {
	const res = await axios.post<Blob>('http://localhost:4321/user-data', json, {
		responseType: 'blob',
	})
	return res.data
}

const downloadUserData = (data: Blob, fileName = 'file') => {
	const ext = mime.getExtension(data.type)
	const url = URL.createObjectURL(data)
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', `${fileName}.${ext}`)
	document.body.appendChild(link)
	link.click()
	link.remove()
}

const normalizePhone = (phone: string) => phone.replace(NORM_PHONE_NUMBER, '')

export const onSubmitForm =
	(validate: JustValidate) => async (e: Event | undefined) => {
		const { userMsg, userName, userPhone } = (e as SubmitEvent)
			.currentTarget as HTMLFormElement

		const json: IUserData = {
			userMsg: userMsg.value,
			userName: userName.value,
			userPhone: normalizePhone(userPhone.value),
		}

		try {
			validate.lockForm()
			const data = await sendUserData(json)
			downloadUserData(data)
			succesSubmit()
		} catch (error) {
			failSubmit()
		} finally {
			validate.unlockForm()
		}
	}
