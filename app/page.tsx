'use client';
import {
  createStyles, Header, Group, Button,
  Divider, Box, Burger, Drawer,
  ScrollArea, rem, Input, Menu,
  Tabs, TabsProps, Modal, Select,
  Pagination, Container, Grid,
  Title, Text, InputBase, Paper,
  Table, NumberInput
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
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
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
import styles from './css/pos.module.css';
import FooterApp from './FooterApp';
import { patientList, pillsList } from './data/data';

const Home = () => {
  const { classes, theme } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [address, handleAddress] = useDisclosure(false);
  const [drawerAddress, handleDrawerAddress] = useDisclosure(false);
  const [addressDefault, setAdressDefault] = useState('Chi nhánh mặc định');
  const [addressOption, setAddressOption] = useState('');
  const [value, setValue] = useState(1);
  const [order, setOrder] = useState(
    [
      {
        'id': 1,
        'value': '1',
        'text': 'Đơn 1',
      },
      {
        'id': 2,
        'value': '2',
        'text': 'Đơn 2',
      },
      {
        'id': 3,
        'value': '3',
        'text': 'Đơn 3',
      },
    ]
  );
  const [addCustomer, handlerAddCustomer] = useDisclosure(false);
  const [selectedPatient, setSelectedPatient] = useState({
    id: 0,
    MSBN: '',
    tenBN: '',
    DonThuoc: []
  });
  function StyledTabs(props: TabsProps) {
    return (
      <Tabs
        unstyled
        styles={(theme) => ({
          tab: {
            ...theme.fn.focusStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[6],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            cursor: 'pointer',
            fontSize: theme.fontSizes.sm,
            display: 'flex',
            alignItems: 'center',

            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },

            '&:not(:first-of-type)': {
              borderLeft: 0,
            },

            '&[data-active]': {
              backgroundColor: theme.colors.blue[0],
            },
          },

          tabIcon: {
            marginRight: theme.spacing.xs,
            display: 'flex',
            alignItems: 'center',
          },

          tabsList: {
            display: 'flex',
          },

        })}
        {...props}
      />
    );
  }
  const [searchKeyword, setSearchKeyWord] = useState('');
  const [result, setResult] = useState([]);
  const filterData = (keywords: string) => {
    const filteredArray: any = pillsList.filter((item) =>
      item.name.toLowerCase().includes(keywords.toLowerCase())
    );
    (keywords.length != 0) ? setResult(filteredArray) : setResult([]);
  };

  const addPills = (item: any) => {
    const isItemExist = selectedPatient.DonThuoc.some((donThuocItem: any) => donThuocItem.sanPham_id === item.id);
    if (!isItemExist) {
      setSelectedPatient((selectedPatient: any) => ({
        ...selectedPatient,
        DonThuoc: [
          ...selectedPatient.DonThuoc,
          {
            sanPham_id: item.id,
            sanPham_ten: item.name,
            sanPham_hamLuong: item.drugConcentration,
            sanPham_donViTinh: item.unit,
            cachDung: '',
            gia: item.price,
            tongTien: item.price,
          }
        ]
      }))
    }
  }
  return (
    <Box>
      {/* Header trang */}
      <Header height={58} px="md" bg={'blue'}>
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
            <Input
              w={265}
              size='md'
              icon={<IconSearch />}
              placeholder="Thêm sản phẩm vào đơn (F3)"
              value={searchKeyword}
              onChange={(e) => { setSearchKeyWord(e.target.value), filterData(e.target.value) }}
            />

            <Group className='mt-2 text-white'>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button >
                    <IconFilterEdit />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown className='bg-slate-300'>
                  <Menu.Item icon={<IconScan size={14} />} className='hover:bg-blue-600 hover:text-white'>IconScan</Menu.Item>
                  <Menu.Item icon={<IconScanEye size={14} />} className='hover:bg-blue-600 hover:text-white'>IconScanEye</Menu.Item>
                  <Menu.Item icon={<IconQrcode size={14} />} className='hover:bg-blue-600 hover:text-white'>IconQrcode</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Group sx={{ height: '100%' }} spacing={0}>
              <StyledTabs>
                <Tabs.List>
                  <Carousel
                    maw={200}
                    height={56}
                    loop
                    align="center"
                  >
                    {
                      order?.map((e, index) => (
                        <Carousel.Slide bg={'blue'} key={index} className='flex justify-center'>
                          <Tabs.Tab
                            value={e.value}
                            className={`text-black font-semibold text-md mt-1 `}
                            rightSection={<IconSquareX className='focus:bg-black ml-1' />}
                          >
                            <Text>{e.text}</Text>
                          </Tabs.Tab>
                        </Carousel.Slide>

                      ))
                    }
                  </Carousel>
                  <Button className='my-2' size='md' onClick={() => setOrder((prevData) => [
                    ...prevData,
                    { id: prevData.length + 1, value: `${prevData.length + 1}`, text: 'Đơn ' + (prevData.length + 1) },
                  ])}>
                    <IconPlus />
                  </Button>
                </Tabs.List>
              </StyledTabs>
            </Group>
            {/* Modal lựa chọn địa chỉ */}
            <Modal size='md' opened={address} onClose={handleAddress.close} title={<p className='font-semibold text-md'>Chọn chi nhánh</p>}>
              <Select
                value={addressDefault}
                label=""
                placeholder='Chi nhánh Hà Nội'
                data={[
                  { value: 'Chi nhánh Hà Nội', label: 'Chi nhánh Hà nội' },
                  { value: 'Chi nhánh Cần Thơ', label: 'Chi nhánh Cần Thơ' },
                  { value: 'Chi nhánh TP HCM', label: 'Chi nhánh TP HCM' },
                  { value: 'Chi nhánh Sóc Trăng', label: 'Chi nhánh Sóc Trăng' },
                ]}
                onChange={(e) => setAddressOption(e)}
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

      <Container className='mt-2 relative w-full' fluid={true} pl={0} pr={9}>
        <Group className='fixed z-50 mx-2 bg-white w-1/4 px-1'>
          <ul>
            {result?.map((item: any, index) => (
              <li
                className='hover:bg-gray-500 hover:text-white cursor-pointer'
                key={index}
                onClick={() => addPills(item)}
              >{item.name}</li>
            ))}
          </ul>
        </Group>
        <Grid className={styles.container_main_content_wrapper}>
          {/* Cột 1 */}
          <Grid.Col span={2} className='bg-white py-0'>
            <ScrollArea style={{ height: 'calc(100vh - 58px)', width: 248 }} offsetScrollbars>
              <Box style={{ width: 400 }}>
                <Table horizontalSpacing="sm" fontSize="md" style={{ border: 'solid 2px black' }} highlightOnHover withBorder withColumnBorders bg={'cyan.2'} >
                  <thead>
                    <tr style={{ border: '2px solid black' }}>
                      <th style={{ border: 'solid 2px black' }}>Mã số bệnh nhân</th>
                      <th>Tên bệnh nhân</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      patientList.map((e, index) => (
                        <tr
                          key={index}
                          style={{ border: 'solid 2px black', cursor: 'pointer' }}
                          onClick={() => {
                            setSelectedPatient({ id: e.id, MSBN: e.MSBN, tenBN: e.tenBN, DonThuoc: [] });
                            setOrder((prevData) => [
                              ...prevData,
                              { id: prevData.length + 1, value: `${prevData.length + 1}`, text: 'Đơn ' + (prevData.length + 1) },
                            ])
                          }}>
                          <td style={{ border: 'solid 2px black' }}>
                            {e.MSBN}
                          </td>
                          <td>
                            {e.tenBN}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Box>
            </ScrollArea>
          </Grid.Col>
          {/* Cột 2 */}
          <Grid.Col span={7} className={`${styles.container_main_content} bg-blue-300`}>
            <ScrollArea style={{ height: 'calc(100vh - 220px)', width: '100%' }} offsetScrollbars>
              {(selectedPatient?.id !== 0) && (
                <Group className='flex justify-around'>
                  <Group><p>Mã số bệnh nhân:</p> <Text color='red'>{selectedPatient?.MSBN}</Text> </Group>
                  <Group><p>Tên bệnh nhân:</p> <Text color='green.7'>{selectedPatient.tenBN}</Text></Group>
                </Group>
              )}
              <Table withBorder withColumnBorders mt={5}>
                {
                  (selectedPatient?.DonThuoc.length > 0 && selectedPatient?.id !== 0) &&
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
                    (selectedPatient?.id !== 0 && selectedPatient?.DonThuoc.map((e: any, index) => (
                      <tr key={index}>
                        <td>{e.sanPham_ten}</td>
                        <td><Input></Input></td>
                        <td>{e.sanPham_hamLuong}</td>
                        <td>{e.sanPham_donViTinh}</td>
                        <td><NumberInput style={{ width: 80 }} min={0} max={100} value={value} onChange={(e: number) => setValue(e)} /></td>
                        <td>{e.gia}</td>
                        <td>{value * e.gia}</td>
                      </tr>
                    ))
                    )
                  }
                </tbody>
              </Table>
            </ScrollArea>
            <FooterApp />
          </Grid.Col>
          {/* Cột 3 */}
          <Grid.Col span={3} className='bg-blue-200'>
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
                2
              </Text>
            </Text>
            <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
              <Text>
                Tổng tiền
              </Text>
              <Text>
                554,000
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
                554,000
              </Title>
            </Text>
            <Text display={'flex'} style={{ justifyContent: 'space-between' }} className='my-2'>
              <Text>
                Tiền khách đưa
              </Text>
              <Text>
                554,000
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
                544,000
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
            <Grid.Col className='grid grid-cols-5 bottom-5 fixed'>
              <Grid.Col className='col-span-2'>
                <button className='text-black font-semibold'>
                  Thanh Toán nhiều hình thức (F7)
                </button>
              </Grid.Col>
              <Grid.Col className='col-span-3'>
                <button className='bg-green-600 rounded-md text-center p-6 text-white'>
                  Thanh toán (F1)
                </button>
              </Grid.Col>
            </Grid.Col>
          </Grid.Col>
        </Grid>
      </Container>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="60%"
        padding="md"
        title="Menu"
        className={`${classes.hiddenDesktop}`}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <StyledTabs>
            <Tabs.List>
              {
                order?.length > 2 && (

                  <Button variant='default' className='my-3'>
                    <IconArrowBadgeLeftFilled />
                  </Button>
                )
              }
              {
                order?.map((e, index) => (
                  <Tabs.Tab
                    value={e.text}
                    key={e.id}
                    className={`text-black font-semibold text-md py-2`}

                  >
                    {e.text}
                  </Tabs.Tab>
                ))
              }
              {
                order?.length > 2 && (
                  <Button variant='default' size='xs' className='my-3' >
                    <IconArrowBadgeRightFilled />
                  </Button>
                )
              }

              <Button className='my-2' size='md' onClick={() => setData((prevData) => [
                ...prevData,
                { id: prevData.length + 1, value: `${prevData.length + 1}`, text: 'Đơn ' + (prevData.length + 1) },
              ])}>
                <IconPlus color='black' />
              </Button>

            </Tabs.List>
          </StyledTabs>
          <Button.Group className='mx-2 mt-2'>
            <Button leftIcon={<IconMapPinFilled />} variant='outline' onClick={handleAddress.open}>
              Chi nhánh mặc định
            </Button>
            <Button className='px-1' variant='outline'><IconDevices /></Button>
            <Button variant='outline' className='px-1'><IconZoomPan /></Button>
            <Button variant='outline' className='px-1'><IconRefresh /></Button>
            <Button variant='outline' className='px-1'><IconHome2 /></Button>
            <Button variant='outline' leftIcon={<IconHelp />}>Trợ giúp</Button>
          </Button.Group>
          <Modal size='md' opened={drawerAddress} onClose={handleDrawerAddress.close} title={<p className='font-semibold text-md'>Chọn chi nhánh</p>}>
            <Select
              label=""
              placeholder='Chi nhánh Hà Nội'
              data={[
                { value: 'Chi nhánh Hà Nội', label: 'Chi nhánh Hà nội' },
                { value: 'Chi nhánh Cần Thơ', label: 'Chi nhánh Cần Thơ' },
                { value: 'Chi nhánh TP HCM', label: 'Chi nhánh TP HCM' },
                { value: 'Chi nhánh Sóc Trăng', label: 'Chi nhánh Sóc Trăng' },
              ]}
            />
            <div className='mt-2 flex justify-end'>
              <Button variant='white' color='dark' onClick={handleDrawerAddress.close}>
                Thoát
              </Button>
              <Button variant='white' onClick={handleDrawerAddress.close} className='bg-blue-500 text-white'>
                Lưu
              </Button>
            </div>
          </Modal>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Home;