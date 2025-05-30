import Image from "next/image";

export default function O_MnePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/2">
        <Image
          src="/images/about.jpg" // ✅ veřejná cesta v /public
          alt="Lukáš Šimandl při natáčení"
          className="rounded-lg object-cover w-full h-auto"
          width={800}
          height={600}
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">„Užívej život, ať máš v důchoďáku co vyprávět“</h1>
        <p className="text-gray-700 leading-relaxed">
          Jmenuju se Lukáš Šimandl a rád se směju :- D K natáčení jsem se dostal po vojně v roce 2000 a od té doby se filmařině věnuji. V roce 2010 jsem si
          založil společnost Videojinak a pustil se do natáčení na plný pecky. :- ) U svatebních videí jsem si vždy říkal, že v Čechách je spousta parádních
          kameramanů, jejich videa jsou luxusní, ale … na mě prostě moc romantická. A jelikož prý mám talent bavit lidi, tak jsem toto chtěl zakomponovat právě
          do svatebních videí. A to se povedlo. Spousta klientů mi říká, že si naše natáčení totálně užili a za to jsme rádi. : ) Mám také rád bojová umění a
          sporty, a proto je také v mé tvorbě hodně uvidíte. Ať jde o záznamy z akcí typu Oktagon, či krátké akční filmečky. Nejradši se ale směju, a tak
          tvoříme s mojí bandou spousty videí na odreagování… v naší dílně vznikl například JÚTUBER JOŽKA. :- ) „Moje práce je můj koníček“ … Kdo vlastně tohle
          může říct? … Já určitě jo. :- )
        </p>
      </div>
    </div>
  );
}
