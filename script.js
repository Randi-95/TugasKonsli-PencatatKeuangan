let itemIndex = null
let totalPemasukan = 0
let totalPengeluaran = 0
let totalSaldo = 0

document.querySelector("form[name=formTambahTransaksi]").onsubmit = function(event){
    event.preventDefault()

    const tBody = document.getElementById("tabel-body")
    const inputNamaTransaksi = document.getElementById("nama").value.trim()
    const inputJumlah = document.getElementById("jumlah").value.trim()
    const inputKategori = document.getElementById("kategori").value
    const inputTanggal = document.getElementById("tanggal").value

    if(inputNamaTransaksi == "" || inputJumlah == "" || inputKategori =="" || inputTanggal == ""){
        alert("isi form transaksi terlebih dahulu")
        return
    }

    if(itemIndex){ 
        const isiNamaTransaksi = itemIndex.querySelector(".isiNamaTransaksi")
        const isiKategori = itemIndex.querySelector(".isiKategori")
        const isiJumlah = itemIndex.querySelector(".isiJumlah")
        const isiTanggal = itemIndex.querySelector(".isiTanggal")

        const kategoriLama = isiKategori.textContent
        const jumlahLama = Number(isiJumlah.textContent)

        if(kategoriLama === "pemasukan"){
            totalPemasukan -= jumlahLama
        } else {
            totalPengeluaran -= jumlahLama
        }

        isiNamaTransaksi.textContent = inputNamaTransaksi
        isiKategori.textContent = inputKategori
        isiJumlah.textContent = inputJumlah
        isiTanggal.textContent = inputTanggal

        const jumlahBaru = Number(inputJumlah)
        if(inputKategori === "pemasukan"){
            totalPemasukan += jumlahBaru
        } else {
            totalPengeluaran += jumlahBaru
        }

        itemIndex = null
        const submit = document.getElementById("submit")
        submit.value = "+Tambah Transaksi"
        submit.style.backgroundColor = "#2ecc71"
        updateTotal()

        document.forms["formTambahTransaksi"].reset()
    } else { 
        let isiKeuangan = document.createElement("tr") 
        isiKeuangan.innerHTML = `
            <td class="isiTanggal">${inputTanggal}</td>
            <td class="isiNamaTransaksi">${inputNamaTransaksi}</td>
            <td class="isiKategori">${inputKategori}</td>
            <td class="isiJumlah">${inputJumlah}</td>
            <td class="btnAksi">
                <div class="btnEdit"> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" 
                        stroke-linecap="round" stroke-linejoin="round" aria-labelledby="title-edit" role="img"> 
                    <title id="title-edit">Edit transaksi</title> 
                    <path d="M12 20h9"/> 
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/> 
                    </svg>

                </div>
                <div class="btnHapus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" 
                        stroke-linecap="round" stroke-linejoin="round" aria-labelledby="title-trash" role="img"> 
                    <title id="title-trash">Hapus transaksi</title> 
                    <path d="M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 10v8M14 10v8M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/> 
                    </svg>

                 </div>
            </td>
        `

        const btnEdit = isiKeuangan.querySelector(".btnEdit")
        const btnHapus = isiKeuangan.querySelector(".btnHapus")

        btnEdit.addEventListener("click", function(){
            document.getElementById("nama").value = isiKeuangan.querySelector(".isiNamaTransaksi").textContent
            document.getElementById("kategori").value = isiKeuangan.querySelector(".isiKategori").textContent
            document.getElementById("jumlah").value = isiKeuangan.querySelector(".isiJumlah").textContent
            document.getElementById("tanggal").value = isiKeuangan.querySelector(".isiTanggal").textContent

            const submit = document.getElementById("submit")
            submit.value = "Edit Transaksi"
            submit.style.backgroundColor = "blue"
            itemIndex = isiKeuangan
        })

        btnHapus.addEventListener("click", function(){
            if(confirm("Yakin ingin hapus transaksi")){
                const kategori = isiKeuangan.querySelector(".isiKategori").textContent
                const jumlah = Number(isiKeuangan.querySelector(".isiJumlah").textContent)

                if(kategori === "pemasukan"){
                    totalPemasukan -= jumlah
                } else {
                    totalPengeluaran -= jumlah
                }
                updateTotal()
                isiKeuangan.remove()
            }
        })

        if(inputKategori === "pemasukan"){
            totalPemasukan += Number(inputJumlah)
        } else {
            totalPengeluaran += Number(inputJumlah)
        }

        tBody.appendChild(isiKeuangan)
    }

    updateTotal()
    document.forms["formTambahTransaksi"].reset()
}

function updateTotal(){
    totalSaldo = totalPemasukan - totalPengeluaran
    document.getElementById("saldo-akhir").textContent = totalSaldo
    document.getElementById("total-pemasukan").textContent = totalPemasukan
    document.getElementById("total-pengeluaran").textContent = totalPengeluaran
}