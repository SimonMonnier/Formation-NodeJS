import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const AddRoomForm = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(null)

  useEffect(() => {

    
  }, [])

  const onFinish = async values => {
    
    await fetch(`/api/rooms`, {
        
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', values);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    navigate(`/rooms`)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const handleChange = event => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }


  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='Nom'
        name='name'
        initialValue="Nom de la Chambre"
        rules={[
          {
            required: true,
            message: "Merci d'entrer le nom de la chambre."
          }
        ]}
      >
        <Input name='name' onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label='Capacité max'
        name='maxPersons'
        initialValue='1'
        rules={[
          {
            required: false
          }
        ]}
      >
        <Input
          value="1"
          type='number'
          name='maxPersons'
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddRoomForm
