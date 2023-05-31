'use client';

import { useState } from 'react';
import {
    Grid, Button, Modal, Group, Table, Checkbox,
    Drawer, TextInput, Select, Input, Pagination,
    Title, Text, Container, Tabs, Box,
    ScrollArea, NativeSelect, ColorPicker
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import {
    IconSearch, IconScan, IconScanEye, IconQrcode, IconFilterEdit,
    IconSquareX, IconPlus, IconMapPinFilled, IconDeviceCameraPhone,
    IconZoomPan, IconRefresh, IconHome2, IconHelpCircleFilled,
    IconCheck, IconMenu2, IconSettingsCog, IconChartHistogram,
    IconReportAnalytics, IconDiscount2, IconUserSearch,
    IconClipboardText, IconCornerUpLeftDouble, IconFileDollar,
    IconFile3d, IconGift, IconPrinter, IconMapPin, IconTrash,
    IconDevices, IconPalette, IconBiohazard, IconRadioactive,
    IconChevronDown, IconAlertCircle, IconDeviceIpad, IconDeviceMobile,
    IconDeviceDesktop

} from '@tabler/icons-react';
import styles from './css/pos.module.css';

const FooterApp = () => {
    const data = [
        {
            'id': 11,
            'name': 'Áo nỉ có mũ Asos',
            'price': '360,000',
            'scoreEqual': '3,600',
            'quantity': 91
        },
        {
            'id': 12,
            'name': 'Áo nỉ chui đầu Emporio...',
            'price': '1,500,000',
            'scoreEqual': '15,000',
            'quantity': 93
        },
        {
            'id': 13,
            'name': 'Áo len cổ lọ Asos',
            'price': '680,000',
            'scoreEqual': '6,800',
            'quantity': 84
        },
    ];
    const listItem = data.map((e) => {
        return {
            'value': e.name,
            'label': e.name
        }
    });
    const TraHang = [
        {
            'MaDon': 'SON00074',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Mùi',
            'TongTien': '10,000,000',
        },
        {
            'MaDon': 'SON00073',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Khách lẻ',
            'TongTien': '10,000,000',
        },
        {
            'MaDon': 'SON00072',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Khách lẻ',
            'TongTien': '5,000,000',
        },
        {
            'MaDon': 'SON00071',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Mùi',
            'TongTien': '1,000,000',
        },
        {
            'MaDon': 'SON00070',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Khách lẻ',
            'TongTien': '1,000,000',
        },
        {
            'MaDon': 'SON00069',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Anh Đức',
            'TongTien': '2,040,000',
        },
        {
            'MaDon': 'SON00074',
            'NgayTao': '14/09/2020',
            'TenNhanVien': 'Mùi',
            'KhachHang': 'Khách hàng',
            'TongTien': '2,500,000',
        },
    ];

    const thTraHang = (
        <tr>
            <th>Mã đơn</th>
            <th>Ngày tạo</th>
            <th>Nhân viên</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th></th>
        </tr>
    );
    const rowsTraHang = TraHang.map((e, index) => (
        <tr key={index}>
            <td>{e.KhachHang}</td>
            <td>{e.MaDon}</td>
            <td>{e.NgayTao}</td>
            <td>{e.TenNhanVien}</td>
            <td>{e.TongTien}</td>
            <td><Button variant='outline'>Chọn đơn</Button></td>
        </tr>
    ));

    const ths = (
        <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Điểm tương ứng</th>
            <th>Có thể đổi</th>
            <th></th>
        </tr>
    );
    const rows = data.map((element) => (
        <tr key={element.name}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.price}</td>
            <td >{element.scoreEqual}</td>
            <td>{element.quantity}</td>
            <td><Button size='xs' variant='outline'>Chọn sản phẩm</Button></td>
        </tr>
    ));

    const tabs = [
        { value: 'ThemDichVu', label: 'Thêm dịch vụ', content: 'Dịch vụ được thêm vào đơn sẽ không ghi nhận trong kho', icon: IconPlus },
        { value: 'ThietLapChung', label: 'Thiết lập chung', content: 'Thiết lập chung cho các đơn hàng POS', icon: IconSettingsCog },
        { value: 'DoiGiaBanHang', label: 'Đổi giá bán hàng', content: 'Thông tin về chính sách áp dụng cho từng đơn hàng', icon: IconChartHistogram },
        { value: 'XemBaoCao', label: 'Xem báo cáo', content: 'Tổng hợp những thông tin về tình hình bán hàng', icon: IconReportAnalytics },
        { value: 'TaoPhieuThuChi', label: 'Tạo phiếu thu/chi', content: 'Tổng hợp những thông tin về tình hình bán hàng', icon: IconFileDollar },
        { value: 'XemDanhSachDonHang', label: 'Xem danh sách đơn hàng', content: 'Tổng hợp những thông tin về tình hình bán hàng', icon: IconFile3d },
        { value: 'TraHang', label: 'Trả Hàng', content: 'Tổng hợp những thông tin về tình hình bán hàng', icon: IconCornerUpLeftDouble },
        { value: 'DoiQua', label: 'Đổi quà', content: 'Tổng hợp những thông tin về tình hình bán hàng', icon: IconGift },
        { value: 'ChietKhauDon', label: 'Chiết khấu đơn', content: 'Thêm chiết khấu cho đơn hàng', icon: IconDiscount2 },
        { value: 'ThongTinKhachHang', label: 'Thông tin khách hàng', content: 'Xem thông tin chung của khách hàng trong đơn', icon: IconUserSearch },
        { value: 'GhiChuDonHang', label: 'Ghi chú đơn hàng', content: 'Thêm ghi chú cho đơn hàng POS', icon: IconClipboardText },
        { value: 'InDonGanNhat', label: 'In đơn gần nhất', content: 'In đơn hàng đã được tạo gần đây', icon: IconPrinter },
        { value: 'DoiChiNhanh', label: 'Đổi chi nhánh', content: 'Chuyển sang bán hàng tại chi nhánh khác', icon: IconMapPin },
        { value: 'XoaToanBoSanPham', label: 'Xóa toàn bộ sản phẩm', content: 'Xóa toàn bộ sản phẩm trên đơn hàng', icon: IconTrash },
        { value: 'KetNoiManHinhPhu', label: 'Kết nối màn hình phụ', content: 'Kết nối với các màn hình phụ để hiển thị thông tin đơn', icon: IconDevices },
        { value: 'ThayDoiMauSac', label: 'Thay đổi màu sắc', content: 'Hỗ trợ thay đổi màu sắc chủ đạo của màn hình bán hàng', icon: IconPalette }
    ];

    const labelCheckBox = ['STT', 'Mã hàng', 'Tên sản phẩm', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền'];
    const [discount, handlerDiscount] = useDisclosure(false);
    const [check, setCheck] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [noteOrder, handlerNoteOrder] = useDisclosure(false);
    const [giftModal, handlerGiftModal] = useDisclosure(false);
    const [deleteProduct, handlerDeleteProduct] = useDisclosure(false);
    const [customerInformation, handlerCustomerInformation] = useDisclosure(false);
    const [returns, handlerReturns] = useDisclosure(false);
    const [listOperation, handlerListOperation] = useDisclosure(false);
    const [changePriceSell, handlerChangePriceSell] = useDisclosure(false);
    const [searchValue, onSearchChange] = useState('');
    const [activePage, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('ThemDichVu');

    return (
        <Grid grow gutter={'xs'} className={styles.footer_main_content}>
            <Grid.Col span={3}>
                <Button variant='outline' fullWidth color='dark'>
                    Thêm dịch vụ (F9)
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='md' opened={discount} onClose={handlerDiscount.close} title={<p className='text-md font-semibold'>Chiết khấu đơn hàng</p>}>
                    <Grid columns={4}>
                        <Grid.Col span={2}>
                            <Text>
                                Chiết khấu thường
                            </Text>

                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Group>
                                <Button.Group>
                                    <Button variant='default' className='border hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white text-blue-500 border-blue-500'>%</Button>
                                    <Button variant='default' className='border hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white border-blue-500 text-blue-500'>đ</Button>
                                </Button.Group>
                                <Input placeholder='0'></Input>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={4} >
                            <Button.Group className='flex justify-end'>
                                <Button variant='white' color='dark' onClick={handlerDiscount.close}>
                                    Thoát
                                </Button>
                                <Button variant='white' onClick={handlerDiscount.close}>
                                    Lưu
                                </Button>
                            </Button.Group>
                        </Grid.Col>
                    </Grid>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerDiscount.open}>
                    Chiết khấu đơn (F6)
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Notifications />
                <Modal size='xl' opened={opened} onClose={close} title={<p className='text-md font-semibold'>Áp dụng khuyến mại</p>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Tên chương trình</th>
                                <th>Loại khuyến mại</th>
                                <th>Điều kiện</th>
                                <th>Chiết khấu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Checkbox
                                        label='Mua 1 tặng 1'
                                        radius='xl'
                                        onClick={() => setCheck(!check)}
                                    />
                                </td>
                                <td>Mua đích danh sản phẩm tặng đích danh sản phẩm</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>
                                    <Button disabled={check ? false : true} variant='outline' color='red' onClick={() => setCheck(!check)}>Ngừng áp dụng</Button>
                                </th>
                                <th></th>
                                <th>
                                    <Button variant='white' color='dark' onClick={() => { setCheck(false); close() }}>
                                        Thoát
                                    </Button>
                                </th>
                                <th>
                                    <Button disabled={check ? false : true} variant='outline' color='blue' onClick={() => {
                                        notifications.show({
                                            id: 'load-data',
                                            loading: true,
                                            title: 'Đang áp dụng voucher',
                                            message: 'Vui lòng chờ trong giây lát!',
                                            autoClose: false,
                                            withCloseButton: false,
                                        });

                                        setTimeout(() => {
                                            notifications.update({
                                                id: 'load-data',
                                                color: 'teal',
                                                title: 'Đã áp dụng voucher!',
                                                message: 'Áp dụng voucher thành công!',
                                                icon: <IconCheck size='1rem' />,
                                                autoClose: 1000,
                                            });
                                            close(); setCheck(false);
                                        }, 2000);
                                    }} >
                                        Áp dụng
                                    </Button>
                                </th>
                            </tr>
                        </tfoot>
                    </Table>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={open}>
                    Khuyến mại (F8)
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='xl' opened={giftModal} onClose={handlerGiftModal.close} title={<p className='text-md font-semibold'>Danh sách sản phẩm đổi quà</p>}>
                    <Grid>
                        <Grid.Col span={5}>
                            <Select
                                label=''
                                placeholder='Chọn loại sản phẩm'
                                searchable
                                onSearchChange={onSearchChange}
                                searchValue={searchValue}
                                nothingFound='No options'
                                data={listItem}

                            />
                        </Grid.Col>
                        <Grid.Col span={7}>
                            <Input icon={<IconSearch size={18} />}
                                className='mt-1 mx-2' placeholder='Thêm sản phẩm vào đơn (F3)'
                                rightSection={<Button variant='white' className='p-0 -ml-7'>Tìm kiếm</Button>}
                            />
                        </Grid.Col>
                    </Grid>
                    <Table>
                        <thead>
                            {ths}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                    <Grid>
                        <Grid.Col span={5}>
                            <p className='mt-1 text-sm'>
                                Hiển thị kết quả từ 11 - 13 trên tổng 13
                            </p>
                        </Grid.Col>
                        <Grid.Col span={7}>
                            <Pagination value={activePage} onChange={setPage} total={5} />
                        </Grid.Col>
                    </Grid>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerGiftModal.open}>
                    Đổi quà
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='md' opened={noteOrder} onClose={handlerNoteOrder.close} title={<p className='text-md font-semibold'>Thêm ghi chú đơn</p>}>
                    <TextInput
                        placeholder='Ghi chú đơn hàng'
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button variant='white' color='dark' onClick={handlerNoteOrder.close}>
                            Thoát
                        </Button>
                        <Button variant='white' onClick={handlerNoteOrder.close}>
                            Lưu
                        </Button>
                    </div>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerNoteOrder.open}>
                    Ghi chú đơn hàng
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='md' opened={changePriceSell} onClose={handlerChangePriceSell.close} title={<p className='text-md font-semibold'>Thay đổi giá bán hàng</p>}>
                    <Grid columns={12} className='mx-2'>
                        <Grid.Col span={6} >
                            <Select
                                label="Thuế"
                                placeholder="Lựa chọn"
                                rightSection={<IconChevronDown size="1rem" />}
                                rightSectionWidth={30}
                                styles={{ rightSection: { pointerEvents: 'none' } }}
                                data={[{ value: '1', label: 'Giá chưa bao gồm thuế' }, { value: '2', label: 'Giá đã bao gồm thuế' }]}
                            />
                            <Select
                                label="Nhân viên phụ trách"
                                placeholder="Chọn nhân viên"
                                rightSection={<IconChevronDown size="1rem" />}
                                rightSectionWidth={30}
                                styles={{ rightSection: { pointerEvents: 'none' } }}
                                data={[{ value: '1', label: 'tunlc@sapo.vn' }, { value: '2', label: 'ctnul@sapo.vn' }]}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="Bảng giá"
                                placeholder="Lựa chọn"
                                rightSection={<IconChevronDown size="1rem" />}
                                rightSectionWidth={30}
                                styles={{ rightSection: { pointerEvents: 'none' } }}
                                data={[{ value: '1', label: 'Giá bán lẻ' }, { value: '2', label: 'Giá bán sỉ' }]}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className='mt-2 flex justify-end'>
                        <Button variant='white' color='dark' onClick={handlerChangePriceSell.close}>
                            Thoát
                        </Button>
                        <Button variant='white' onClick={handlerChangePriceSell.close}>
                            Lưu
                        </Button>
                    </div>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerChangePriceSell.open}>
                    Đổi giá bán hàng
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='lg' opened={customerInformation} onClose={handlerCustomerInformation.close} title={<p className='font-semibold text-md'>Thông tin khách hàng</p >}>
                    <Container size='30rem' px={0}>
                        <Title order={5}>
                            Thông tin chung
                        </Title>
                        <Container>
                            <Grid columns={12}>
                                <Grid.Col span={6}>
                                    <Text className='py-1'>Tên khách hàng</Text>
                                    <Text className='py-1'>Nhóm khách hàng</Text>
                                    <Text className='py-1'>Email</Text>
                                    <Text className='py-1'>Số điện thoại</Text>
                                    <Text className='py-1'>Công nợ hiện tại</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text className='py-1'>Mùi</Text>
                                    <Text className='py-1'>Bán lẻ</Text>
                                    <Text className='py-1'>---</Text>
                                    <Text className='py-1'>0975188082</Text>
                                    <Text className='py-1'>0</Text>
                                </Grid.Col>
                            </Grid>
                        </Container>
                        <Title order={5}>
                            Thông tin tích điểm
                        </Title>
                        <Container>
                            <Grid columns={12}>
                                <Grid.Col span={6}>
                                    <Text className='py-1'>Điểm hiện tại</Text>
                                    <Text className='py-1'>Tổng chi tiêu</Text>
                                    <Text className='py-1'>Hạng thẻ</Text>
                                    <Text className='py-1'>Doanh thu còn lại để lên hạng</Text>

                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text className='py-1'>100000</Text>
                                    <Text className='py-1'>10.000.000</Text>
                                    <Text className='py-1'>---</Text>
                                    <Text className='py-1'>0</Text>

                                </Grid.Col>
                            </Grid>
                        </Container>
                    </Container>
                    <div className='mt-2 flex justify-end'>
                        <Button variant='white' color='dark' onClick={handlerCustomerInformation.close} size='md'>
                            Thoát
                        </Button>
                    </div>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerCustomerInformation.open}>
                    Thông tin khách hàng
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='md' opened={deleteProduct} onClose={handlerDeleteProduct.close} title={<p className='font-semibold text-md'>Xóa toàn bộ sản phẩm</p>}>
                    <p className='text-sm'>
                        Toàn bộ sản phẩm trong đơn hàng sẽ bị xóa. Bạn có chắc chắn
                        muốn xóa sản phẩm trong đơn hàng này không?
                    </p>
                    <div className='mt-2 flex justify-end'>
                        <Button variant='white' color='dark' onClick={handlerDeleteProduct.close}>
                            Thoát
                        </Button>
                        <Button variant='white' onClick={handlerDeleteProduct.close} className='bg-blue-500 text-white'>
                            Đồng ý
                        </Button>
                    </div>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerDeleteProduct.open}>
                    Xóa toàn bộ sản phẩm
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Modal size='lg' opened={returns} onClose={handlerReturns.close} title={<p className='font-semibold text-md'>Trả hàng</p>}>
                    <Grid>
                        <Grid.Col span={5}>
                            <Select
                                label=''
                                placeholder='Lọc đơn hàng'
                                searchable
                                onSearchChange={onSearchChange}
                                searchValue={searchValue}
                                nothingFound='No options'
                                data={listItem}

                            />
                        </Grid.Col>
                        <Grid.Col span={7}>
                            <Input icon={<IconSearch size={18} />}
                                className=' mx-2' placeholder='Tìm kiếm đơn hàng'
                                rightSection={<Button variant='white' className='p-0 -ml-7'>Tìm kiếm</Button>}
                            />
                        </Grid.Col>
                    </Grid>
                    <Table>
                        <thead>
                            {thTraHang}
                        </thead>
                        <tbody>
                            {rowsTraHang}
                        </tbody>
                    </Table>
                    <p className='mt-1 text-sm'>
                        Hiển thị kết quả từ 1 - 7 trên tổng 7
                    </p>
                </Modal>
                <Button variant='outline' fullWidth color='dark' onClick={handlerReturns.open}>
                    Trả hàng
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Button variant='outline' fullWidth color='dark'>
                    Xem danh sách đơn hàng
                </Button>
            </Grid.Col>
            <Grid.Col span={3}>
                <Button variant='outline' fullWidth color='dark'>
                    Xem báo cáo
                </Button>
            </Grid.Col>

            <Grid.Col span={3}>
                <Button variant='outline' fullWidth color='dark' onClick={handlerListOperation.open}>
                    Danh sách thao tác
                </Button>
                <Modal size='xl' opened={listOperation} onClose={handlerListOperation.close} title={<p className='font-semibold text-md'>Xem thêm thao tác</p>}>
                    <Tabs defaultValue={activeTab} orientation='vertical' allowTabDeactivation={false} color='indigo' variant="pills">
                        <ScrollArea h={250} maw={200} type='hover'>
                            <Tabs.List>
                                {
                                    tabs?.map((element, index) => (
                                        <Tabs.Tab key={index} value={element.value} icon={<element.icon color={activeTab === `${element.value}` ? 'white' : 'gray'} />} onClick={() => setActiveTab(element.value)}>
                                            <Text className='font-semibold w-full'>
                                                {element.label}
                                            </Text>
                                            <p>
                                                {element.content}
                                            </p>
                                        </Tabs.Tab>
                                    ))
                                }
                            </Tabs.List>
                        </ScrollArea>
                        <Tabs.Panel value='ThemDichVu'>
                            <Text className='font-semibold mx-2'>
                                Thêm dịch vụ
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='ThietLapChung'>
                            <Text className='font-semibold mx-2'>
                                Thiết lập cửa hàng
                            </Text>
                            <Grid columns={12} className='mx-2'>
                                <Grid.Col span={6}>
                                    <div className='flex'>
                                        <Checkbox
                                            label="In hóa đơn"
                                            className='my-2'
                                        />
                                        <IconAlertCircle size={15} className='mt-3 ml-1 text-blue-600' />
                                    </div>
                                    <Select
                                        size={'xs'}
                                        label="Sắp xếp thứ tự sản phẩm"
                                        placeholder="Sắp xếp thứ tự sản phẩm"
                                        data={[{ value: '1', label: 'Tăng dần' }, { value: '2', label: 'Giảm dần' }]}
                                        rightSection={<IconChevronDown size="1rem" />}
                                        rightSectionWidth={40}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <div className='flex'>
                                        <Checkbox
                                            label="Tách dòng"
                                            className='my-2'
                                        />
                                        <IconAlertCircle size={15} className='mt-3 ml-1 text-blue-600' />
                                    </div>
                                    <Select
                                        size={'xs'}
                                        label="Đơn vị chiết khấu"
                                        placeholder="Đơn vị chiết khấu"
                                        data={[{ value: '1', label: '%' }, { value: '2', label: 'đ' }]}
                                        rightSection={<IconChevronDown size="1rem" />}
                                        rightSectionWidth={40}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Text className='font-semibold mx-2'>
                                Điều chỉnh cột hiển thị thông tin sản phẩm
                            </Text>
                            <Group className='mx-4'>
                                {
                                    labelCheckBox?.map((e, index) => (
                                        <Checkbox key={index} label={e} className='mt-2' />
                                    ))
                                }
                            </Group>
                            <Group className='mt-2 flex justify-end mx-2'>
                                <Button variant='default'>
                                    Về mặc định
                                </Button>
                                <Button variant='default' onClick={handlerListOperation.close}>
                                    Thoát
                                </Button>
                                <Button className='bg-blue-600' onClick={handlerListOperation.close}>
                                    Lưu
                                </Button>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value='DoiGiaBanHang'>
                            <Text className='font-semibold mx-2'>
                                Đổi giá bán hàng
                            </Text>
                            <Grid columns={12} className='mx-2'>
                                <Grid.Col span={6} >
                                    <Select
                                        label="Thuế"
                                        placeholder="Lựa chọn"
                                        rightSection={<IconChevronDown size="1rem" />}
                                        rightSectionWidth={30}
                                        styles={{ rightSection: { pointerEvents: 'none' } }}
                                        data={[{ value: '1', label: 'Giá chưa bao gồm thuế' }, { value: '2', label: 'Giá đã bao gồm thuế' }]}
                                    />
                                    <Select
                                        label="Nhân viên phụ trách"
                                        placeholder="Chọn nhân viên"
                                        rightSection={<IconChevronDown size="1rem" />}
                                        rightSectionWidth={30}
                                        styles={{ rightSection: { pointerEvents: 'none' } }}
                                        data={[{ value: '1', label: 'tunlc@sapo.vn' }, { value: '2', label: 'ctnul@sapo.vn' }]}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Select
                                        label="Bảng giá"
                                        placeholder="Lựa chọn"
                                        rightSection={<IconChevronDown size="1rem" />}
                                        rightSectionWidth={30}
                                        styles={{ rightSection: { pointerEvents: 'none' } }}
                                        data={[{ value: '1', label: 'Giá bán lẻ' }, { value: '2', label: 'Giá bán sỉ' }]}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Group className='mt-16 flex justify-end mx-2'>
                                <Button variant='default'>
                                    Về mặc định
                                </Button>
                                <Button variant='default' onClick={handlerListOperation.close}>
                                    Thoát
                                </Button>
                                <Button className='bg-blue-600' onClick={handlerListOperation.close}>
                                    Lưu
                                </Button>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value='XemBaoCao'>
                            <Text className='font-semibold mx-2'>
                                Xem báo cáo
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='TaoPhieuThuChi'>
                            <Text className='font-semibold mx-2'>
                                Tạo phiếu thu chi
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='XemDanhSachDonHang'>
                            <Text className='font-semibold mx-2'>
                                Xem danh sách đơn hàng
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='TraHang'>
                            <Text className='font-semibold mx-2'>
                                Trả hàng
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='DoiQua'>
                            <Text className='font-semibold mx-2'>
                                Đổi quà
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='ChietKhauDon'>
                            <Text className='font-semibold mx-2'>
                                Chiết khấu đơn
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='ThongTinKhachHang'>
                            <Text className='font-semibold mx-2'>
                                Thông tin khách hàng
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='GhiChuDonHang'>
                            <Text className='font-semibold mx-2'>
                                Ghi chú đơn hàng
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='InDonGanNhat'>
                            <Text className='font-semibold mx-2'>
                                In đơn gần nhất
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='DoiChiNhanh'>
                            <Text className='font-semibold mx-2'>
                                Chọn chi nhánh
                            </Text>
                            <Select
                                className='w-1/2 mt-2 mx-4'
                                label=""
                                placeholder="Lựa chọn"
                                rightSection={<IconChevronDown size="1rem" />}
                                rightSectionWidth={30}
                                styles={{ rightSection: { pointerEvents: 'none' } }}
                                data={['Sóc Trăng', 'Cần Thơ', 'An Giang', 'Hậu Giang']}
                            />
                            <Group className='mt-36 flex justify-end mx-2'>
                                <Button variant='default'>
                                    Về mặc định
                                </Button>
                                <Button variant='default' onClick={handlerListOperation.close}>
                                    Thoát
                                </Button>
                                <Button className='bg-blue-600' onClick={handlerListOperation.close}>
                                    Lưu
                                </Button>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value='XoaToanBoSanPham'>
                            <Text className='font-semibold mx-2'>
                                Xóa toàn bộ sản phẩm
                            </Text>
                        </Tabs.Panel>
                        <Tabs.Panel value='KetNoiManHinhPhu'>
                            <Text className='font-semibold mx-2'>
                                Chọn màn hình phụ
                            </Text>
                            <Group className='my-2 mx-5'>
                                <Button className='bg-blue-600' leftIcon={<IconDeviceIpad />}>Ipad</Button>
                                <Button className='bg-blue-600' leftIcon={<IconDeviceMobile />}>Mobile </Button>
                                <Button className='bg-blue-600' leftIcon={<IconDeviceDesktop />}>Desktop </Button>
                            </Group>
                            <Group className='mt-36 flex justify-end mx-2'>
                                <Button variant='default'>
                                    Về mặc định
                                </Button>
                                <Button variant='default' onClick={handlerListOperation.close}>
                                    Thoát
                                </Button>
                                <Button className='bg-blue-600' onClick={handlerListOperation.close}>
                                    Lưu
                                </Button>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value='ThayDoiMauSac'>
                            <Text className='font-semibold mx-2'>
                                Chọn một màu để thay đổi màu sắc của màn hình bán hàng
                            </Text>
                            <Box className='mx-2 mt-2'>
                                <ColorPicker
                                    className='w-full'
                                    format="hex"
                                    swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#40c057', '#82c91e']}
                                />
                            </Box>
                            <Group className='mt-2 flex justify-end mx-2'>
                                <Button variant='default'>
                                    Về mặc định
                                </Button>
                                <Button variant='default' onClick={handlerListOperation.close}>
                                    Thoát
                                </Button>
                                <Button className='bg-blue-600' onClick={handlerListOperation.close}>
                                    Lưu
                                </Button>
                            </Group>
                        </Tabs.Panel>
                    </Tabs>
                </Modal>
            </Grid.Col>
        </Grid>
    );
}

export default FooterApp;