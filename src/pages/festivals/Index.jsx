import { useEffect, useState } from 'react';
import axios from '@/config/api';
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Pencil } from 'lucide-react';
import DeleteBtn from '@/components/DeleteBtn';
import { toast } from 'sonner';

export default function FestivalsIndex() {
  const [festivals, setFestivals] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: '/festivals',
    };

    const fetchFestivals = async () => {
      try {
        let response = await axios.request(options);
        setFestivals(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFestivals();
  }, []);

  useEffect(() => {
    if (location.state?.festival) {
      console.log('STATE: ', location.state);
      toast.success(
        `Festival "${location.state.festival.title}" created successfully!`,
        {
          duration: 4000,
          closeButton: true,
        }
      );
      navigate('/festivals', { replace: true });
    }
  }, [location.state]);

  if (festivals.length === 0) {
    return <h1>LOADING...</h1>;
  }

  const onDeleteCallback = (id) => {
    setFestivals(festivals.filter((festival) => festival.id !== id));
  };

  return (
    <>
      <Button asChild variant="outline" className="mb-4 mr-auto block">
        <Link size="sm" to={`/festivals/create`}>
          Create New Festival
        </Link>
      </Button>
      <Table>
        <TableCaption>A table of festivals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead className="text-right">End Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {festivals.map((festival) => (
            <TableRow
              key={festival.id}
              // onClick={() => navigate(`/festivals/${festival.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{festival.title}</TableCell>
              <TableCell>{festival.city}</TableCell>
              <TableCell>{festival.start_date}</TableCell>
              <TableCell className="text-right">{festival.end_date}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    <Link to={`/festivals/${festival.id}`}>
                      <Eye />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to={`/festivals/${festival.id}/edit`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <DeleteBtn
                    onDeleteCallback={onDeleteCallback}
                    resource="festivals"
                    id={festival.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$78,500.00</TableCell>
          </TableRow>
          </TableFooter> */}
      </Table>
    </>
  );
}
