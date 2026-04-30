import { FormEvent, useMemo, useState } from 'react';

import { getTodayISO } from '../../utils/date';

interface ExamFormProps {
  onSave: (subject: string, score: number, totalScore: number, date: string) => Promise<void>;
}

const SUBJECT_OPTIONS = ['语文', '数学', '英语', '科学', '其他'] as const;

function ExamForm({ onSave }: ExamFormProps) {
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [totalScore, setTotalScore] = useState('100');
  const [date, setDate] = useState(() => getTodayISO());
  const [isSaving, setIsSaving] = useState(false);

  const parsedScore = Number(score);
  const parsedTotalScore = Number(totalScore);

  const scoreIsEmpty = score.trim() === '';
  const totalScoreIsEmpty = totalScore.trim() === '';
  const hasValidTotalScore = !totalScoreIsEmpty && Number.isFinite(parsedTotalScore) && parsedTotalScore > 0;
  const hasValidScore = !scoreIsEmpty && Number.isFinite(parsedScore) && parsedScore >= 0;
  const isScoreInRange = hasValidScore && hasValidTotalScore && parsedScore <= parsedTotalScore;
  const isFormValid = subject !== '' && hasValidTotalScore && isScoreInRange && date !== '';

  const scoreHint = useMemo(() => {
    if (scoreIsEmpty || totalScoreIsEmpty) {
      return '';
    }

    if (!hasValidTotalScore) {
      return '满分要大于 0 哦';
    }

    if (!hasValidScore) {
      return '分数不能小于 0';
    }

    if (!isScoreInRange) {
      return '分数不能超过满分';
    }

    return '';
  }, [hasValidScore, hasValidTotalScore, isScoreInRange, scoreIsEmpty, totalScoreIsEmpty]);

  const resetForm = () => {
    setSubject('');
    setScore('');
    setTotalScore('100');
    setDate(getTodayISO());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await onSave(subject, parsedScore, parsedTotalScore, date);
      resetForm();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="exam-subject">
          考试科目
        </label>
        <select
          id="exam-subject"
          className="w-full appearance-none rounded-[1.75rem] border border-sky-200/80 bg-white px-5 py-4 text-lg font-semibold text-slate-800 shadow-[0_12px_28px_rgba(14,165,233,0.10)] outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          disabled={isSaving}
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
        >
          <option value="">请选择科目</option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="exam-score">
          你的分数
        </label>
        <input
          id="exam-score"
          className="w-full rounded-3xl border border-sky-200 bg-white px-4 py-4 text-lg text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          disabled={isSaving}
          inputMode="numeric"
          min={0}
          onChange={(event) => setScore(event.target.value)}
          placeholder="你的分数"
          type="number"
          value={score}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="exam-total-score">
          满分
        </label>
        <input
          id="exam-total-score"
          className="w-full rounded-3xl border border-sky-200 bg-white px-4 py-4 text-lg text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          disabled={isSaving}
          inputMode="numeric"
          min={1}
          onChange={(event) => setTotalScore(event.target.value)}
          placeholder="满分"
          type="number"
          value={totalScore}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="exam-date">
          考试日期
        </label>
        <input
          id="exam-date"
          className="w-full rounded-3xl border border-sky-200 bg-white px-4 py-4 text-lg text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          disabled={isSaving}
          onChange={(event) => setDate(event.target.value)}
          type="date"
          value={date}
        />
      </div>

      {scoreHint ? <p className="text-sm font-medium text-rose-500">{scoreHint}</p> : null}

      <button
        className="w-full rounded-3xl bg-sky-500 px-4 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        disabled={!isFormValid || isSaving}
        type="submit"
      >
        {isSaving ? '记录中...' : '记录成绩 📝'}
      </button>
    </form>
  );
}

export default ExamForm;
