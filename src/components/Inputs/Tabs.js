const { Tabs, Tab } = require("@mui/material");

export const TabComponent = ({ value, handleChange, data }) => {
	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	return (
		<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
			{data?.map((dt) => (
				<Tab key={dt.id} label={dt?.name} {...a11yProps(dt.id)} />
			))}
		</Tabs>
	);
};
