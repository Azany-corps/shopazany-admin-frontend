import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const List = () => {
  const rows = [
    {
      id: 1,
      name: "Senegalese Nuts ",
      category: "Farmers",
      orderid: "#319233",
      price: "$532.38",
      sold: "63,273",
      sales: "$196,254.87",
    },
    
{
  id: 2,
  name: "Italian Pasta",
  category: "Groceries",
  orderid: "#743212",
  price: "$12.99",
  sold: "9,874",
  sales: "$128,355.26",
  },
  {
  id: 3,
  name: "Japanese Green Tea",
  category: "Beverages",
  orderid: "#562871",
  price: "$25.50",
  sold: "15,634",
  sales: "$398,451.60",
  },
  {
  id: 4,
  name: "Mexican Salsa",
  category: "Condiments",
  orderid: "#910456",
  price: "$8.75",
  sold: "32,598",
  sales: "$285,495.50",
  },
  {
  id: 5,
  name: "French Baguettes",
  category: "Bakery",
  orderid: "#112233",
  price: "$3.99",
  sold: "52,712",
  sales: "$210,206.88",
  }
  ];
  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">#</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Product Category</TableCell>
            <TableCell className="tableCell">Order Id</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Sold</TableCell>
            <TableCell className="tableCell">Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="">{row.id}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.category}</TableCell>
              <TableCell className="tableCell">{row.orderid}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.sold}</TableCell>
              <TableCell className="tableCell">{row.sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default List;
