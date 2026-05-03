import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Wingstop Nutrition Calculator - Track Calories & Macros Instantly';
export const size = {
    width: 1200,
    height: 630,
};

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #006938 0%, #004D28 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: '#FDB913',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            marginRight: '30px',
                        }}
                    >
                        🍗
                    </div>
                    <div
                        style={{
                            fontSize: '72px',
                            fontWeight: '900',
                            lineHeight: '1.1',
                        }}
                    >
                        Wingstop
                    </div>
                </div>

                <div
                    style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        textAlign: 'center',
                        marginBottom: '20px',
                        maxWidth: '900px',
                    }}
                >
                    Nutrition Calculator
                </div>

                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: '400',
                        textAlign: 'center',
                        opacity: 0.9,
                        marginBottom: '40px',
                        maxWidth: '900px',
                    }}
                >
                    Track calories, macros, allergens & diet goals for every Wingstop menu item
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '30px',
                        marginTop: '40px',
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '20px 30px',
                            borderRadius: '15px',
                            fontSize: '24px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        🔥 Calories
                    </div>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '20px 30px',
                            borderRadius: '15px',
                            fontSize: '24px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        🥗 Macros
                    </div>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '20px 30px',
                            borderRadius: '15px',
                            fontSize: '24px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        📍 Locations
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        fontSize: '24px',
                        opacity: 0.8,
                    }}
                >
                    wingstopcaloriecalculator.us
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}