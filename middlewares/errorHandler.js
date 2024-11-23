// module.exports = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//       message: err.message || 'Internal Server Error',
//     });
//   };
  

module.exports = (err, req, res, next) => {
  // Log error stack ke console untuk debugging
  console.error(err.stack);

  // Mengirimkan response error ke client
  res.status(err.status || 500).json({
    success: false, // Tambahkan indikator sukses untuk konsistensi format
    error: {
      message: err.message || 'Internal Server Error', // Pesan error
      details: err.details || null, // Informasi tambahan jika ada
    },
  });
};
