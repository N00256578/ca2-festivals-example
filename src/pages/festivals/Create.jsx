import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from '@/config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export default function CreateFestival() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    start_date: '',
    end_date: '',
  });

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createFestival = async () => {
    const options = {
      method: 'POST',
      url: `/festivals`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    };

    try {
      let response = await axios.request(options);
      navigate('/festivals', {
        state: {
          message: `Festival "${response.data.title}" created successfully!`,
          type: 'success',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFestival();
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create New Festival
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={form.title}
          name="title"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Description"
          value={form.description}
          name="description"
          className="mt-2"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="City"
          value={form.city}
          name="city"
          className="mt-2"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Start Date"
          value={form.start_date}
          name="start_date"
          className="mt-2"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="End Date"
          value={form.end_date}
          name="end_date"
          className="mt-2"
          onChange={handleChange}
        />

        <Button type="submit" variant="outline" className="mt-4 cursor-pointer">
          Submit
        </Button>
      </form>
    </>
  );
}
