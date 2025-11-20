import { useEffect, useState } from 'react';
import axios from '@/config/api';
import { useParams } from 'react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FestivalsShow() {
  const [festival, setFestival] = useState([]);
  const { id } = useParams();

  let token = localStorage.getItem('token');

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
        setFestival(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFestival();
  }, []);

  return (
    <>
      <h1>Show festival</h1>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{festival.title}</CardTitle>
          <CardDescription>{festival.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={festival.image_path} alt={festival.title} />
        </CardContent>
      </Card>
    </>
  );
}
