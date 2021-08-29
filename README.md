*# GET /api/dealer/vehicles/:id*
Vehicle details'te bu linke istek atarak ID'ye göre araba çekiyoruz, fakat şuanki apiyle linkli elle yazmamız gerek, apiye gönderdiğimiz araba id'nin bize _/api/dealer/vehicles/_ 'dende gelmesi lazım örnek: https://prnt.sc/1qqiufu



*İhtiyaç*
- Araba bilgilerini update etmek için example'daki body yetersiz gibi: https://prnt.sc/1qqjyvm
- Araba Silme Endpointi
- Satıldı olarak işaretleme Endpoint'i
- Harita?

- Recent activites: Data bu şekilde gelse çok iyi olur, 
{
    time:"08:42,
    color:"blue",
    status:"Parked",
} Kısaca color datası olsa güzel olur olmazsada önemli değil

- ?page=1 ?page=2 diye istek atıyoruz ya pagination için gelen datadan bize next previosu dönüyor birde kaç tane page olduğu dönerse paginantion'u daha güzel hale getirebiliriz

- Cars In Motion apileri
- Summary apileri: https://prnt.sc/1qqkey0 . + Buradaki total cars sayısı  için _/api/dealer/vehicles/_ gelen result sayısını kullandım fakat paginaation yüzünden max 10 geliyor, toplam araba sayısına ihtiyacım var onun dışında burda parked cars falanda var


*Soru:*
Car List'teki Dealer sütünu için data, apiden gelmiyor ama bence gelmesine de gerek yok, hatta orada dealer sütünü olmasına da gerek yok ( bence ) çünkü zaten bir dealer olarak login oluyoruz ve o car listte login olan dealer'a özel, kısaca adam o arabaları kendisi sattığını biliyor. https://prnt.sc/1qqixox ( eğer doğru anladıysam)

*Soru:*
Bu butonlar ne işe yarayacak: https://prnt.sc/1qqkar3

*Soru:*
Araba eklerken Serial ID giriyoruz, aynı zamanda serial id car list'te var backendden serial id gelmiyor ama 2 adet _device_serial_no_ data geliyor orada bunları mı kullanacağım?

*Soru:*
Araba eklerken Fiyat girme olucak mı? Çünkü Vehicle details'te arabanın fiyatı yazıyor: https://prnt.sc/1qqjpbb ++ Buradaki bir çok  STK ne olucak https://prnt.sc/1qqjt1d


*Soru:*
Araba ekleme sayfası: Burası ne olucak herhangi bir api lazım mı https://prnt.sc/1qqjuo0

