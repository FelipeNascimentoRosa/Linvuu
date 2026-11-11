import React, { useState } from 'react';
import { X, Award, CheckCircle2, Download, Printer, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { playRussianAudio } from '../utils/audio';

interface A1CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
}

export const A1CertificateModal: React.FC<A1CertificateModalProps> = ({
  isOpen,
  onClose,
  defaultName = 'Фелипе Роза',
}) => {
  const [studentName, setStudentName] = useState(defaultName);
  const [studentNameLatin, setStudentNameLatin] = useState('Felipe Rosa');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePlayRussianPraise = () => {
    setIsPlayingAudio(true);
    playRussianAudio('Поздравляем! Вы отлично завершили уровень А1 русского языка! Молодец!');
    setTimeout(() => setIsPlayingAudio(false), 4500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col print:border-none print:shadow-none print:max-w-none print:max-h-none print:rounded-none">
        {/* Header toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-3xl print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Diploma de Conclusão do Nível A1
              </h2>
              <p className="text-xs text-slate-500">
                Certificação das 10 Primeiras Aulas Fundamentais de Russo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayRussianPraise}
              disabled={isPlayingAudio}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir Parabéns</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Name Customization Inputs for Student */}
        <div className="px-8 py-3 bg-amber-50/50 border-b border-amber-100 flex flex-wrap items-center gap-4 text-xs print:hidden">
          <span className="font-semibold text-amber-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Personalize seu nome no certificado:
          </span>
          <div className="flex items-center gap-2">
            <label className="text-slate-600">Em Russo:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg font-medium text-slate-900 outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Фелипе Роза"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-slate-600">Em Português:</label>
            <input
              type="text"
              value={studentNameLatin}
              onChange={(e) => setStudentNameLatin(e.target.value)}
              className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg font-medium text-slate-900 outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Felipe Rosa"
            />
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-white flex-1 flex flex-col justify-between relative overflow-hidden print:p-8">
          {/* Decorative Classic Border */}
          <div className="border-4 border-double border-amber-700/60 p-6 sm:p-10 rounded-2xl relative bg-radial from-amber-50/20 via-white to-amber-50/40">
            {/* Corner Embellishments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

            {/* Top Seal & Heading */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 border-2 border-amber-500/50 shadow-inner mb-2">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-amber-800">
                КУРС РУССКОГО ЯЗЫКА · CURSO DE LÍNGUA RUSSA
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                СЕРТИФИКАТ
              </h1>
              <p className="text-sm font-serif italic text-slate-600">
                Certificado Oficial de Conclusão do Nível A1 (Elementar)
              </p>
            </div>

            {/* Recipient */}
            <div className="text-center my-6 space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Certificamos que
              </p>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-950 border-b-2 border-amber-400/80 inline-block px-8 py-1">
                {studentName} {studentNameLatin && `(${studentNameLatin})`}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                concluiu com êxito as <strong>10 Aulas Fundamentais do Nível A1</strong>, dominando as habilidades de conversação, escuta com áudios nativos, leitura e a estrutura gramatical elementar da língua russa.
              </p>
            </div>

            {/* Competency Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8 text-[11px] text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Cumprimentos e Nomes</div>
                  <div className="text-slate-500">Aulas 1 e 2: Apresentações e possessivos</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Família & Estrutura "У меня"</div>
                  <div className="text-slate-500">Aula 3: Posse e plurais</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Caso Preposicional (в / на)</div>
                  <div className="text-slate-500">Aula 4: Profissões e locais</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Nacionalidades & Moradia</div>
                  <div className="text-slate-500">Aula 5: Verbo жить (живу/жил)</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Idiomas & Conjugação I e II</div>
                  <div className="text-slate-500">Aula 6: читать vs говорить</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Rotina & Causalidade</div>
                  <div className="text-slate-500">Aula 7: потому что e дома/домой</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Cores, Posse no Passado</div>
                  <div className="text-slate-500">Aula 8: был/была e adjetivos</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Caso Acusativo Inanimado</div>
                  <div className="text-slate-500">Aula 9: Comidas, есть e пить</div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Roupas, Preços e Numerais</div>
                  <div className="text-slate-500">Aula 10: носить, стоить, 10–1.000.000</div>
                </div>
              </div>
            </div>

            {/* Bottom Signatures & Seal */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
              <div className="text-center sm:text-left">
                <div className="font-semibold text-slate-900">Data de Emissão:</div>
                <div>{currentDate}</div>
                <div className="text-[10px] text-slate-400">Nível A1 Concluído · 10 Aulas</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-amber-300">
                  A1
                </div>
                <div className="text-[10px] font-medium text-amber-800 mt-1 uppercase tracking-wider">
                  Отлично! (Excelente)
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif italic font-semibold text-slate-900 border-b border-slate-300 pb-1 mb-1">
                  Prof. de Língua Russa
                </div>
                <div className="text-[10px] text-slate-500">
                  Curso de Russo em 30 Aulas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
