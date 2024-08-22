export default function InvoiceTable({ itemList }: { itemList: Item[] }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Rate</th>
					<th>Quantity</th>
					<th>Amount</th>
				</tr>
			</thead>

			<tbody>
				{itemList.map((item) => (
					<tr key={item.id}>
						<td className='text-sm'>{item.name}</td>
						<td className='text-sm'>{item.cost}</td>
						<td className='text-sm'>{item.quantity}</td>
						<td className='text-sm'>
							{Number(item.cost * item.quantity).toLocaleString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

/*
import React from 'react';

interface Item {
  id: string;
  name: string;
  cost: number;
  quantity: number;
}

export default function InvoiceTable({ itemList }: { itemList: Item[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Rate</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {itemList.length > 0 ? (
            itemList.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4 text-sm">{item.name}</td>
                <td className="py-2 px-4 text-sm">{item.cost.toFixed(2)}</td>
                <td className="py-2 px-4 text-sm">{item.quantity}</td>
                <td className="py-2 px-4 text-sm">
                  {Number(item.cost * item.quantity).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2 px-4 text-center text-sm text-gray-500">
                No items to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
*/