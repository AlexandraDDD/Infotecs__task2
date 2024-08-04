import React, { FC } from 'react'
import { User } from '../../types/types';
interface TableRowProps {
    users: User[];
}
export const TableRow: FC<TableRowProps> = ({users}) => {
console.log(users);

    return (
        <>
            {users.map((user: any) => (
                <tr key={user.id}>
                    <th scope='row'>{user.id}</th>
                    <td>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                  <td>{`${user.address.city}, ${user.address.address}`}</td> 
                </tr>
            ))}
        </>

    )
}
