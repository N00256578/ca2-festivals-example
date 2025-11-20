import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from '@/config/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function EditFestival() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    start_date: '',
    end_date: '',
  });

  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: `/festivals/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchFestival = async () => {
      try {
        let response = await axios.request(options);
        let festival = response.data;
        setForm({
          title: festival.title,
          description: festival.description,
          city: festival.city,
          start_date: festival.start_date,
          end_date: festival.end_date,
        });
        console.log(festival);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFestival();
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateFestival = async () => {
    const options = {
      method: 'PATCH',
      url: `/festivals/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    };

    try {
      let response = await axios.request(options);
      console.log(response.data);
      navigate('/festivals');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    updateFestival();
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update Festival
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
