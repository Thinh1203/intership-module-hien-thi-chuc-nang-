'use client';
import {
  createStyles, Header, Group, Button,
  Divider, Box, Burger, Drawer,
  ScrollArea, rem, Input, Menu,
  Tabs, TabsProps, Modal, Select,
  Loader, Container, Grid,
  Title, Text, InputBase, Paper,
  Table, NumberInput, TextInput,
  Pagination
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import {
  IconNotification, IconCode, IconBook, IconChartPie3,
  IconFingerprint, IconCoin, IconSearch,
  IconScan, IconScanEye, IconQrcode, IconFilterEdit,
  IconSquareX, IconPlus, IconMapPinFilled,
  IconZoomPan, IconRefresh, IconHome2, IconArrowBadgeLeftFilled,
  IconDevices, IconArrowBadgeRightFilled, IconHelp, IconChevronDown
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import '@algolia/autocomplete-theme-classic';
const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },
  closeButton: {
    background: theme.colors.blue[6],
    border: 'none'
  },

}));

import FooterApp from './FooterApp';
import { product, user } from './api/api';
import ProductItem from './ProductItem';
import Split from 'react-split';
const Autocomplete = dynamic(() => import('./Autocomplete'), {
  loading: () => <Loader color="dark" size="lg" variant="dots" />
})

const Home = () => {
  const { classes, theme } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [address, handleAddress] = useDisclosure(false);
  const [addressDefault, setAdressDefault] = useState('Chọn phòng khám');
  const [addressOption, setAddressOption] = useState('');
  const [addCustomer, handlerAddCustomer] = useDisclosure(false);
  const [selectedPatient, setSelectedPatient] = useState([{
    id: 0,
    MSBN: '',
    tenBN: '',
    maBHYT: '',
    DonThuoc: []
  }]);
  const { productData, productIsError, productIsLoading } = product();
  const { userData, userIsError, userIsLoading } = user();
  const [active, setActive] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const totalPages = Math.ceil(userData?.length / usersPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedData = userData?.slice(startIndex, endIndex);
  let totalPrice: number = 0;

  // Them san pham vao don thuoc
  const addPills = (item: any) => {
    if (selectedPatient.length <= 1) {
      return notifications.show({
        message: 'Vui lòng chọn bệnh nhân',
        autoClose: 2000,
        color: 'red'
      });
    } else {
      for (let i = 0; i < selectedPatient.length; i++) {
        if (selectedPatient[i].id === active) {
          const isItemExist = selectedPatient[i].DonThuoc.some((donThuocItem: any) => donThuocItem.sanPham_id === item.sanphams_id);
          if (!isItemExist) {
            setSelectedPatient((selectedPatient: any) => {
              const updatedSelectedPatient = [...selectedPatient];
              const patientIndex = updatedSelectedPatient.findIndex((patient: any) => patient.id === active);

              if (patientIndex !== -1) {
                const updatedDonThuoc = [
                  ...updatedSelectedPatient[patientIndex].DonThuoc,
                  {
                    sanPham_id: item.sanphams_id,
                    sanPham_ten: item.sanpham_ten,
                    sanPham_hamLuong: item.sanphams_nongdohamluong,
                    sanPham_donViTinh: item.sanphams_donvi,
                    cachDung: '',
                    gia: item.sanphams_donggia,
                    soLuong: 1
                  }
                ];

                updatedSelectedPatient[patientIndex] = {
                  ...updatedSelectedPatient[patientIndex],
                  DonThuoc: updatedDonThuoc,
                };
              }
              return updatedSelectedPatient;
            });
          }
        }
      }
    }
  }

  // Tao don thuoc moi

  const prescription = (patient: any) => {
    let status: boolean = false;
    for (let index = 0; index < selectedPatient.length; index++) {
      if (selectedPatient[index].id === patient.benhnhans_id) {
        status = true;
      }
    };
    if (!status) {
      setSelectedPatient((prevData) => [
        ...prevData,
        {
          id: patient.benhnhans_id,
          MSBN: patient.benhnhans_mabenhnhan,
          tenBN: patient.benhnhans_ten,
          maBHYT: patient.benhnhans_mabhyt,
          DonThuoc: []
        }
      ]);
    }
    return setActive(patient.benhnhans_id);
  }

  // Danh sách benh nhan
  const renderTableRows = () => {
    return displayedData?.map((e: any, index: number) => (
      <tr
        key={index}
        style={{ border: 'solid 2px black', cursor: 'pointer' }}
        onClick={() => prescription(e)}
        className={
          selectedPatient.some(a => a.id === e.benhnhans_id && a.DonThuoc.length > 0)
            ? 'bg-green-500 text-white hover:text-black'
            : ''
        }
      >
        <td style={{ border: 'solid 2px black' }}>
          {e.benhnhans_mabenhnhan}
        </td>
        <td>
          {e.benhnhans_ten}
        </td>
      </tr>
    ));
  };

  return (
    (userIsLoading) ? (
      <div>
        <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 'auto' }} />
      </div>
    ) : (
      <Box>
        {/* Header trang */}
        <Header height={58} px="md" bg={'blue'}>
          <Group position="apart" sx={{ height: '100%' }}>
            <Group>
              <Autocomplete
                openOnFocus={false}
                placeholder={'Tìm kiếm'}
                getSources={() => [
                  {
                    sourceId: 'products',
                    getItems({ query }: { query: string }) {
                      return [
                        productData?.filter((item: any) =>
                          item.sanpham_ten.toLowerCase().includes(query.toLowerCase())
                        )
                      ]
                    },
                    onSelect(params: any) {
                      const { item, setQuery } = params;
                      addPills(item);
                      setQuery("");

                    },
                    templates: {
                      item({ item }: { item: any, components: any }) {
                        return <ProductItem hit={item} onClickAddPills={addPills} />;
                      },
                    },
                  },
                ]}
              />
            </Group>
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Group sx={{ height: '100%' }} spacing={0}>
                {selectedPatient?.length > 1 && (
                  <Carousel w={'10vw'} loop height={60} bg={'white'}>
                    {selectedPatient?.map((e, index) => {
                      if (e.id !== 0) {
                        return (
                          <Carousel.Slide key={index} style={{ textAlign: 'center', cursor: 'pointer' }}>
                            <Text>
                              Đơn thuốc
                            </Text>
                            <Text mt={0} onClick={(a) => { a.stopPropagation(); setActive(e.id); }} color='dark'>
                              {e?.MSBN}
                            </Text>
                          </Carousel.Slide>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Carousel>
                )}
              </Group>

              {/* Modal lựa chọn địa chỉ  */}
              <Modal size='md' opened={address} onClose={handleAddress.close} title={<p className='font-semibold text-md'>Chọn phòng khám</p>}>
                <Select
                  value={addressDefault}
                  label=""
                  placeholder='Phòng khám số 01'
                  data={[
                    { value: 'Phòng khám số 01', label: 'Phòng khám số 01' },
                    { value: 'Phòng khám số 02', label: 'Phòng khám số 02' },
                    { value: 'Phòng khám số 03', label: 'Phòng khám số 03' },
                    { value: 'Phòng khám số 04', label: 'Phòng khám số 04' },
                  ]}
                  onChange={(e: any) => setAddressOption(e)}
                />
                <div className='mt-2 flex justify-end'>
                  <Button variant='white' color='dark' onClick={handleAddress.close}>
                    Thoát
                  </Button>
                  <Button variant='white' onClick={() => { handleAddress.close(), setAdressDefault(addressOption) }} className='bg-blue-500 text-white'>
                    Lưu
                  </Button>
                </div>
              </Modal>
              <Button.Group>
                <Button leftIcon={<IconMapPinFilled />} onClick={handleAddress.open}>
                  {addressDefault}
                </Button>
                <Button className='px-1'><IconDevices /></Button>
                <Button className='px-1'><IconZoomPan /></Button>
                <Button className='px-1'><IconRefresh /></Button>
                <Button className='px-1'><IconHome2 /></Button>
                <Button leftIcon={<IconHelp />}>Trợ giúp</Button>
              </Button.Group>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
        {/* Thân trang */}


        <Split className="split">
          <div style={{ minWidth: '280px', maxWidth: '380px', height: 'calc(100vh - 58px)', position: 'relative' }}>
            <Table horizontalSpacing="sm" fontSize="md" style={{ border: 'solid 2px black' }} highlightOnHover withBorder withColumnBorders bg={'blue.2'} >
              <thead>
                <tr style={{ border: '2px solid black' }}>
                  <th style={{ border: 'solid 2px black' }}>Mã số bệnh nhân</th>
                  <th>Tên bệnh nhân</th>
                </tr>
              </thead>
              <tbody >
                {renderTableRows()}
              </tbody>
            </Table>
            <Pagination className='absolute bottom-3' total={totalPages} boundaries={3} defaultValue={currentPage} onChange={handlePageChange} />
          </div>
          <div style={{ minWidth: 800, position: 'relative', height: 'calc(100vh - 58px)' }}>
            <ScrollArea style={{ height: 'calc(100vh - 220px)', width: '100%' }} >
              {
                selectedPatient?.length > 1 && selectedPatient?.map(e => {
                  return (active === e.id && (
                    <React.Fragment key={e.id}>
                      <Group key={e.id} className='flex justify-around' bg={'blue.2'}>
                        <Group><p>Mã số bệnh nhân:</p> <Text color='red'>{e?.MSBN}</Text> </Group>
                        <Group><p>Tên bệnh nhân:</p> <Text color='green.6'>{e.tenBN}</Text></Group>
                        <Group><p>Mã số BHYT:</p> <Text color='blue.6'>{e.maBHYT}</Text></Group>
                      </Group>

                      <Table withBorder withColumnBorders>
                        {
                          (e?.DonThuoc.length > 0 && e?.id !== 0) &&
                          (
                            <thead>
                              <tr>
                                <th>Tên</th>
                                <th>Diễn giải</th>
                                <th>Nồng độ hàm lượng</th>
                                <th>Đơn vị tính</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                              </tr>
                            </thead>
                          )
                        }
                        <tbody>
                          {
                            (e?.id !== 0 && e?.DonThuoc.map((element: any, index) => (
                              <tr key={index}>
                                <td>{element.sanPham_ten}</td>
                                <td>
                                  <TextInput
                                    placeholder="Ghi chú ..."
                                    label=""
                                    withAsterisk
                                  />
                                </td>
                                <td>{element.sanPham_hamLuong}</td>
                                <td>{element.sanPham_donViTinh}</td>
                                <td>
                                  <NumberInput style={{ width: 80 }} min={1} max={100} value={element.soLuong} onChange={(productNumber: number) => {
                                    const updatedSelectedPatient = [...selectedPatient];
                                    const patientIndex = updatedSelectedPatient.findIndex((patient: any) => patient.id === e.id);

                                    if (patientIndex !== -1) {
                                      const donThuoc = updatedSelectedPatient[patientIndex].DonThuoc;
                                      const donThuocIndex = donThuoc.findIndex((item: any) => item.sanPham_id === element.sanPham_id);

                                      if (donThuocIndex !== -1) {
                                        donThuoc[donThuocIndex].soLuong = productNumber;
                                      }
                                    }

                                    setSelectedPatient(updatedSelectedPatient);
                                  }}
                                  />
                                </td>
                                <td>{(element.gia).toLocaleString()}</td>
                                <td>{(element.soLuong * element.gia).toLocaleString()}</td>
                                <td style={{ display: 'none' }}>{totalPrice += element.soLuong * element.gia}</td>
                              </tr>
                            ))
                            )
                          }
                        </tbody>
                      </Table>
                    </ React.Fragment>
                  ))
                })
              }
            </ScrollArea>
            <FooterApp />
          </div>
          <div style={{ minWidth: '300px', maxWidth: '400px', height: 'calc(100vh - 58px)', position: 'relative' }}>
            <Modal size='lg' opened={addCustomer} onClose={handlerAddCustomer.close} title={<p className='text-md font-semibold'>Thêm mới khách hàng</p>}>
              <Grid columns={4}>
                <Grid.Col span={2}>
                  <Box maw={320} mx="auto">
                    <InputBase label="Tên khách hàng" required />
                    <InputBase label="Số điện thoại" required />
                    <InputBase label="Địa chỉ" />
                    <InputBase label="Nhóm khách hàng" />
                    <Select
                      label="Giới tính"
                      defaultValue='Nam'
                      data={[
                        { value: 'Nam', label: 'Nam' },
                        { value: 'Nữ', label: 'Nữ' },
                      ]}
                      rightSection={<IconChevronDown size="1rem" />}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Box maw={300} h={200} mx="auto">
                    <InputBase label="Mã khách hàng" />
                    <Select
                      label="Khu vực"
                      placeholder=""
                      data={[
                        { value: 'Sóc Trăng', label: 'Sóc Trăng' },
                        { value: 'Cần Thơ', label: 'Cần Thơ' },
                        { value: 'Hậu Giang', label: 'Hậu Giang' },
                      ]}
                      rightSection={<IconChevronDown size="1rem" />}
                    />
                    <Select
                      label="Phường xã"
                      placeholder=""
                      data={[
                        { value: 'Sóc Trăng', label: 'Sóc Trăng' },
                        { value: 'Cần Thơ', label: 'Cần Thơ' },
                        { value: 'Hậu Giang', label: 'Hậu Giang' },
                      ]}
                      rightSection={<IconChevronDown size="1rem" />}
                    />
                    <InputBase label="Email" type='email' />
                    <InputBase label="Ngày sinh" type='date' />
                  </Box>
                </Grid.Col>
                <Grid.Col span={4} >
                  <Button.Group className='flex justify-end'>
                    <Button variant='white' color='dark' onClick={handlerAddCustomer.close}>
                      Thoát
                    </Button>
                    <Button variant='white' className='bg-blue-500 text-white rounded-none' onClick={handlerAddCustomer.close}>
                      Thêm
                    </Button>
                  </Button.Group>
                </Grid.Col>
              </Grid>
            </Modal>
            <div className='mx-2'>
              <Input
                icon={<IconSearch size={18} color='gray' />}
                rightSection={<Button variant='' p={0} onClick={handlerAddCustomer.open}><IconPlus color='gray' /></Button>}
                placeholder='Thêm khách hàng vào đơn (F4)'>
              </Input>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  Số lượng sản phẩm
                </Text>
                <Text>
                  {
                    selectedPatient?.length > 1 && selectedPatient?.map(e => {
                      return (active == e.id && e.DonThuoc.length)
                    })
                  }
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  Tổng tiền
                </Text>
                <Text>
                  {totalPrice.toLocaleString()}
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  VAT
                </Text>
                <Text>
                  0
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  Chiết khấu
                </Text>
                <Text>
                  0
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Title order={3} color={theme.colors.dark[5]}>
                  Khách phải trả
                </Title>
                <Title order={3} color={theme.colors.dark[5]}>
                  {totalPrice.toLocaleString()}
                </Title>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  Tiền khách đưa
                </Text>
                <Text>
                  {totalPrice.toLocaleString()}
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Select
                  label=""
                  placeholder="Phương thức thanh toán"
                  rightSection={<IconChevronDown size="1rem" />}
                  rightSectionWidth={30}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  data={['Tiền mặt', 'Momo']}
                />
                <Text className='my-1'>
                  {totalPrice.toLocaleString()}
                </Text>
              </Text>
              <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
                <Text>
                  Tiền thừa
                </Text>
                <Text>
                  0
                </Text>
              </Text>
              <Group className='flex justify-between mt-10'>
                <button className='p-2 mx-2 bg-blue-500 text-white rounded-sm hover:bg-blue-700'>
                  Thanh toán nhiều hình thức
                </button>
                <button className='p-2 mx-2 bg-green-500 text-white rounded-sm hover:bg-green-600'>Thanh toán</button>
              </Group>
            </div>
          </div>
        </Split>

      </Box >
    )
  );
}

export default Home;