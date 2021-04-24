import {
    Container,
    Row,
    Col,
    Table,
    Nav,
    NavDropdown,
    FormControl,
    Form,
    Navbar,
    Button,
    Badge
} from 'react-bootstrap';
import React, {useState} from 'react';
import {countries, countryKeys, CountryType} from "./countryData";
import 'bootstrap/dist/css/bootstrap.min.css';


// function CountryCard(props: any) {
//     const country: CountryType = props.country;
//     return (
//         <Card>
//             <Card.Header>{country.name}</Card.Header>
//         </Card>
//     );
// }

export function CountryTable() {
    const [data, setData] = useState(countries);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortKeys, setSortKeys] = useState({last: '', current: 'name'});
    const defaultColumns: (keyof CountryType)[] = ['name', 'capital', 'region', 'population', 'demonym'];
    const [columns, setColumns] = useState(defaultColumns);

    function onSortBy(key: keyof CountryType = 'name') {
        setData(data.map(_ => _).sort((a: CountryType, b: CountryType) => {
            // @ts-ignore
            const x = a[key] < b[key] ? -1 : a[key] === b[key] ? 0 : 1;
            // @ts-ignore
            const y = a[key] > b[key] ? -1 : a[key] === b[key] ? 0 : 1;
            return sortOrder === 'asc' ? x : y;
        }));
        setSortKeys({last: sortKeys.current, current: key});
        toggleSortOrder();
    }

    function toggleColumn(column: keyof CountryType) {
        const i = columns.indexOf(column);
        i > -1 ? setColumns([...columns.slice(0, i), ...columns.slice(i + 1)]) : setColumns([...columns, column]);
    }

    function toggleSortOrder() {
        sortKeys.last === sortKeys.current ? setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') : setSortOrder('asc');
    }

    function reset() {
        setData(countries);
        setColumns(defaultColumns);
    }

    function search(value: string) {
        const d = countries.filter(i => {
            return countryKeys.some((key: keyof CountryType) => {
                const x = i[key];
                if (typeof x === 'string' || Array.isArray(x)) {
                    // @ts-ignore
                    return x.includes(value);
                } else {
                    return false;
                }
            });
        });
        setData(d);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" expand="lg">
                            <Navbar.Brand>CountryTable</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title="Columns" id="basic-nav-dropdown">
                                        {
                                            countryKeys.map((v: string, i: number) => {
                                                const x = v as keyof CountryType;
                                                return (
                                                    <NavDropdown.Item
                                                        key={"column-toggler" + i}
                                                        onClick={() => toggleColumn(x)}>{columns.includes(x) ? '-' : '+'} {v}
                                                    </NavDropdown.Item>
                                                );
                                            })
                                        }
                                    </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                                                 onChange={(e: any) => search(e.target.value)}/>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th onClick={() => reset()} style={{'cursor': 'pointer'}}>#</th>
                                {
                                    columns.map((column: any, index: number) => {
                                        return <th onClick={() => onSortBy(column)}
                                                   style={{'cursor': 'pointer'}}>{column}</th>;
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            <React.Fragment>
                                {
                                    <TableRows data={data} columns={columns}/>
                                }
                            </React.Fragment>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Te Ent
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function TableRows(props: any) {
    return (props.data.map((country: CountryType, i: number) => {
        return (
            <tr key={"country-table-row" + (i + 1)}>
                <td>{i + 1}</td>
                {
                    props.columns.map((column: any, index: number) => {
                        const obj = country[column as keyof CountryType];
                        return (
                            <td key={"td" + index}>
                                {typeof obj === 'string' ?
                                    obj.endsWith('.svg') ? <img src={obj} height="25px"/> : obj :
                                    Array.isArray(obj) ? <List data={obj}/> : JSON.stringify(obj)
                                }
                            </td>
                        );
                    })
                }
            </tr>
        );
    }));
}

function List(props: any) {
    return props.data.map((value: any, index: number) => {
        return (
            <Badge variant="dark" key={"list-" + index}>{
                typeof value === 'string' ? value : Object.values(value).map((v: any, i: number) => {
                    return <KeyValuePair value={v}></KeyValuePair>;
                })
            }</Badge>
        );
    });


}

function KeyValuePair(props: any) {
    return (
        <Badge variant="light">{props.value}</Badge>
    );
}
