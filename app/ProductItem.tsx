import React, { useState, useEffect } from 'react';

const ProductItem = ({ hit}: { hit: any; }) => {
    return (
        <div className='shadow-md shadow-blue-500 p-2'>
            <div><b>Tên sản phẩm:</b> <span className='text-green-600'>{hit.sanpham_ten}</span></div>
            <div><b>Đơn vị tính:</b> <span className='text-violet-500'>{hit.sanphams_donvi}</span></div>
            <div><b>Giá tiền:</b> <span className='text-blue-500'>{hit.sanphams_donggia.toLocaleString()}</span></div>
            <div><b>Tồn kho:</b> <span className='text-red-500'>{hit.sanphams_soluong}</span></div>
        </div>
    );
}

export default ProductItem;
