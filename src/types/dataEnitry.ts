import { z } from 'zod'

// Zod schema
export const scientificActivitySchema = z.object({
	universityId: z.coerce.number(),
	periodId: z.coerce.number(),
	a1: z.coerce.number(),
	a2: z.coerce.number(),
	a3: z.coerce.number(),
	a4: z.coerce.number(),
	a5: z.coerce.number(),
	a6: z.coerce.number(),
	a7: z.coerce.number(),
	a8: z.coerce.number(),
	a9: z.coerce.number(),
	a10: z.coerce.number(),
	a11: z.coerce.number(),
	a11_1: z.coerce.number(),
	a11_2: z.coerce.number(),
	a12: z.coerce.number(),
	a13: z.coerce.number(),
	a14: z.coerce.number(),
	medHi: z.coerce.number(),
	hasHindexesEmployees: z.coerce.number(),
})

// TypeScript type
export type ScientificActivityFormData = z.infer<
	typeof scientificActivitySchema
>
export interface ScientificActivityResponse extends ScientificActivityFormData {
	id: number
	universityName: string
	periodName: string
	submittedAt: string
}

// Professor-teacher uchun schema
export const professorTeacherSchema = z
	.object({
		universityId: z.coerce.number(),
		periodId: z.coerce.number(),
		t1: z.coerce.number(),
		t2: z.coerce.number(),
		t3: z.coerce.number(),
		t4: z.coerce.number(),
		t5: z.coerce.number(),
		t6: z.coerce.number(),
		t7: z.coerce.number(),
		t8: z.coerce.number(),
		t9: z.coerce.number(),
		t10: z.coerce.number(),
		tp: z.coerce.number().min(1),
		tt: z.coerce.number().min(1),
		tid: z.coerce.number(),
		hs: z.coerce.number(),
		sumY: z.coerce.number(),
	})
	.superRefine((data, ctx) => {
		if (data.t2 + data.t3 > data.tp) {
			ctx.addIssue({
				path: ['tp'],
				message:
					"T2 (DSc/professor soni) va T3 (PhD/dotsent soni) yig'indisi TP (asosiy shtat P-O soni) dan oshmasligi kerak",
				code: z.ZodIssueCode.custom,
			})
		}
	})

export type ProfessorTeacherFormData = z.infer<typeof professorTeacherSchema>
export interface ProfessorTeacherResponse extends ProfessorTeacherFormData {
	id: number
	universityName: string
	periodName: string
	submittedAt: string
}

// Xalqaro faoliyat uchun schema
export const internationalActivitySchema = z.object({
	universityId: z.coerce.number(),
	periodId: z.coerce.number(),
	x1: z.coerce.number(),
	x2: z.coerce.number(),
	x3: z.coerce.number(),
	x4: z.coerce.number(),
	x5: z.coerce.number(),
	x6: z.coerce.number(),
	x7: z.coerce.number(),
	x8: z.coerce.number(),
	x9: z.coerce.number(),
	x10: z.coerce.number(),
	x11: z.coerce.number(),
	x12: z.coerce.number(),
	x13: z.coerce.number(),
	x14: z.coerce.number(),
})

export type InternationalActivityFormData = z.infer<
	typeof internationalActivitySchema
>
export interface InternationalActivityResponse extends InternationalActivityFormData {
	id: number
	universityName: string
	periodName: string
	submittedAt: string
}

// Bitiruvchilar bandligi uchun schema
export const graduateEmploymentSchema = z.object({
	universityId: z.coerce.number(),
	periodId: z.coerce.number(),
	b1: z.coerce.number(),
	b2: z.coerce.number(),
	b3: z.coerce.number(),
	b4: z.coerce.number(),
	b5: z.coerce.number(),
	tb: z.coerce.number(),
	yort: z.coerce.number(),
	yref: z.coerce.number(),
})

export type GraduateEmploymentFormData = z.infer<
	typeof graduateEmploymentSchema
>
export interface GraduateEmploymentResponse extends GraduateEmploymentFormData {
	id: number
	universityName: string
	periodName: string
	submittedAt: string
}

// T1 Document type
export interface T1Document {
	id: number
	fieldName: string
	originalFileName: string
	contentType: string
	fileSize: number
	uploadedById: number
	uploadedByName: string
	uploadedAt: string
	downloadUrl: string
}

// T1 Status type
export type T1Status = 'PENDING' | 'APPROVED' | 'REJECTED'

// Updated ProfessorTeacherData with T1 fields
export interface ProfessorTeacherData {
	id: number
	universityId: number
	universityName: string
	periodId: number
	periodName: string
	t1: number
	t1Status: T1Status | null
	t1RejectionReason: string | null
	t1Documents: T1Document[]
	t2: number
	t3: number
	t4: number
	t5: number
	t6: number
	t7: number
	t8: number
	t9: number
	t10: number
	tp: number
	tt: number
	tid: number
	hs: number
	sumY: number
	submittedAt: string
}

export interface UniversityData {
	universityId: number
	universityName: string
	periodId: number
	periodName: string
	professorTeacherData: ProfessorTeacherData | null
	scientificActivityData: any
	internationalActivityData: any
	graduateEmploymentData: any
}

// T1 Pending item for admin
export interface T1PendingItem extends ProfessorTeacherData {}

// T1 Status update request
export interface T1StatusUpdateRequest {
	status: 'APPROVED' | 'REJECTED'
	rejectionReason?: string
}