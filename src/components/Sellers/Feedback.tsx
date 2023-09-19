import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from '@mui/material/Rating';
import React from "react";
import { Icon } from '@iconify/react';

const Feedback = () => {
  const [value, setValue] = React.useState<number | null>(2);
  const rows = [
    {
      id: 1,
      name: "Senegalese Nuts",
      feedback: "sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consec",
      rating: 3.5,
      actions: "$532.38",
      sold: "63,273",
      sales: "$196,254.87",
    },
    {
      id: 2,
      name: "Italian Pasta",
      feedback: "sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consec",
      rating: 4.2,
      actions: "$12.99",
      sold: "9,874",
      sales: "$128,355.26",
    },
    {
      id: 3,
      name: "Japanese Green Tea",
      feedback: "sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consec",
      rating: 2.8,
      actions: "$25.50",
      sold: "15,634",
      sales: "$398,451.60",
    },
    {
      id: 4,
      name: "Mexican Salsa",
      feedback: "sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consec",
      rating: 4.5,
      actions: "$8.75",
      sold: "32,598",
      sales: "$285,495.50",
    },
    {
      id: 5,
      name: "French Baguettes",
      feedback: "sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consec",
      rating: 3.2,
      actions: "$3.99",
      sold: "52,712",
      sales: "$210,206.88",
    }
  ];

  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Feedback</TableCell>
            <TableCell className="tableCell">Rating</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.feedback}</TableCell>
              <TableCell className="tableCell">
                <Rating value={row.rating} precision={0.5} readOnly />
              </TableCell>
              <TableCell className="tableCell">
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-6">
                    <Icon icon="ph:eye" />
                    <Icon icon="ph:trash-light" />
                  </div>
                  <div>
                    <p>17/05/2022</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Feedback;
