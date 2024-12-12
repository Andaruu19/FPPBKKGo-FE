Kelompok - 1
1. Wardatul Amalia Safitri (5025211006)
2. Farel Hanif Andaru (5025221253)

Pada final project Pemrograman Berbasis Kernagka Kerja (PBBKK) ini, kami membuat sebuah platform penyedia layanan streaming film sederhana bernama Nextfix. 
Platform ini dibuat menggunakan Go Lang pada sisi backend (https://github.com/Andaruu19/FPPBKKGo-BE.git) dan Next.js serta Typescript pada sisi frontend.
Secara garis besar terdapat 4 section dalam nextfix, yaitu Home, Movies, Albums, dan Generated Albums

## Video Demo Aplikasi
https://youtu.be/q1p2Yj5zTQE

## Home
Halaman Home adalah halaman awal yang berisi deskripsi singkat platform.

## Movies / Films
Halaman Movies atau Film akan menampilkan daftar Film yang ada dalam database. Pada halaman Films, daftar ini ditampilkan dengan cara mengelompokkan film berdasarkan genre. 
Kemudian, setiap film dapat dibuka untuk melihat deskripsi dan atribut-atribut film lainnya. 
Film juga dapat ditambahkan ke dalam album tertentu. Proses penambahan film ke dalam sebuah album dapat dilakukan dari halaman Films maupun halaman details film.
Pada bagian navbar terdapat kolom untuk search film berdasarkan judulnya. Nantinya, daftar film yang akan ditampilkan sebagai hasil pencarian adalah film-film yang mengandung kata yang dimasukkan dalam searchbar.
Daftar API yang dibuat untuk mendukung fitur-fitur pada halaman Movies / Films adalah:
- GetAllMovies (/movies/)
- GetMovieByGenre (/movies/genre/:slug)
- GetMovieBySlug (/movies/:slug)
- GetMovieByTitle (/movies/search/:title)

Pada routing movies juga terdapat route untuk GetMoviesByActor (/movies/actor/:id). Route ini nantinya akan digunakan untuk mendukung pembuatan Generated Albums.

## Albums
Halaman Albums adalah halaman untuk membuat album secara manual oleh user. Pada halaman ini, user dapat membuat album dengan mengisi form berisi Nama ALbum dan Deskripsi Album yang akan dibuat.
Selanjutnya daftar semua album akan ditampilkan pada halaman Albums. Masing-masing album dapat diedit dan juga dihapus.
Jika sebuah album dibuka, maka halaman akan menampilkan nama alabum, deskripsi album, serta film-film yang ada dalam album tersebut.
Film yang sudah ditambahkan ke dalam album dapat dihapus dari album.
Daftar API yang dibuat untuk mendukung fitur-fitur pada halaman Albums dan Detail Album adalah:
- CreateAlbum (/albums/)
- GetAllAlbums (/albums/)
- GetAlbumByID (/albums/:album_id)
- UpdateAlbum (/albums/:album_id)
- DeleteAlbum (/album/album_id)
- GetMoviesInALbum (/album/:album_id/movies/)
- AddMovieToAlbum (/albums/:album_id/movies/:movie_id)
- RemoveFromAlbum (/albums/:album_id/movies/:movie_id)

## Generated Albums
Generated Albums adalah album yang dibuatkan oleh sistem berdasarkan nama aktor yang diinput ole user.
Pada generated albums, user hanya mengisikan nama aktor yang diinginkan. Kemudian, sistem akan memastikan bahwa aktor tersebut ada dalam daftar pemain film yang ada dalam nextfix.
Setelah itu sistem akan membuatkan album dengan nama aktor tersebut dan mengisi album dengan semua film dimana aktor tersebut menjadi salah satu pemerannya.
Album pada halaman Generated Albums juga dapat diedit, dihapus, dan film-film dalam sebuah generated album juga dapat dihapus dari daftar.
Untuk mendukung hal tersebut, daftar API yang dibuat adalah:
- CreateGeneratedAlbum (/generatedalbums/)
- GetAllGeneratedAlbums (/generatedalbums/)
- GetAlbumByID (/generatedalbums/:album_id)
- UpdateAlbum (/generatedalbums/:album_id)
- DeleteAlbum (/generatedalbum/album_id)
- GetMoviesInALbum (/generatedalbum/:album_id/movies/)
- GenerateMovieToAlbum (/generatedalbums/:album_id/movies/:movie_id) -> Memanggil GetMovieByActor
- RemoveFromAlbum (/generatedalbums/:album_id/movies/:movie_id)

Pada Database terdapat 5 Tabel:
- Actor
- Album
- Genre
- Movie
- AlbumMovie (Tabel untuk relasi Many to Many antara Album dan Movie)

Genre dan Actor akan berelasi dengan Movie. Kemudian, Movie dan Album memiliki relasi Many to Many.
