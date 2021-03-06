/*
가위바위보 0.1초마다 사진 바뀐다.
예전엔 네트워크 처리속도로 인해 하나의 사진을 아래 처럼 상황에 맞게 짤라썼음
 */
var picturePosition = 0;

/*
    자바 map<T,T> 랑 같다.
 */
var dictionary = {
    바위: '0',
    가위: '-107px',
    보: '-225px'
};
var numRCP = {
    가위: 0,
    바위: 1,
    보: -1
};
var resultWord = document.querySelector('#result');
var winWord = document.querySelector('#winCount');
var losdWord = document.querySelector('#loseCount');
var drawWord = document.querySelector('#drawCount');
var winCount = 0;
var loseCount = 0;
var drawCount = 0;

/*
    querySelectorAll은 forEach로 각 이벤트 리스너를 생성할 수 있다.
 */
// 객체를 배열로 변경시켜 줌.
// console.log(Object.entries(dictionary));

// Object-entires.find로 조건에 맞는 애를 찾아서 그 값을 리턴해준다.
function computerSelect(picturePosition) {
    return Object.entries(dictionary).find(function (y) {
        return y[1] === picturePosition;
    })[0]

}

Object.entries(dictionary).findIndex(function (y) {
    console.log(y);
    return y[1] === picturePosition;

});

function startRCP() {
    return setInterval(function () {
        if (picturePosition === dictionary.바위) {
            picturePosition = dictionary.가위;
        } else if (picturePosition === dictionary.가위) {
            picturePosition = dictionary.보;
        } else {
            picturePosition = dictionary.바위;
        }
        document.querySelector('#computer').style.background =
            'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhMWFRUXGRcYGRgYGRsaFxYaGhkeHRgaGBcdHSghGx4lGx0ZIjIhJikrLi4uGh8zODMtNyotLisBCgoKDg0OGhAQGi8lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJABXQMBIgACEQEDEQH/xAAbAAADAQADAQAAAAAAAAAAAAAABgcFAgMEAf/EAEoQAAIABAMFBQQHBAcGBwEAAAECAAMEEQUSIQYHMUFREyJhcYEUMoKRI0JSYnKSoRWiscEkM0ODk7KzJXN0wtHSFzVTVGPD8Rb/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAAIDAAIDAQADAQAAAAAAAAABAgMRITESMkEiE1FhQv/aAAwDAQACEQMRAD8AuMEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEZO1GPSqGneom3IWwCji7HRVHn15AE8om1NWbQYgO3lzZdJKbVF0F15EdxmOnM2vxAtENpdlowcivwRONm9sauRVrQYqFzzLdjPQWVyeANgAbnS9gQbAjUGKPBPSHFrs4zHCgliAACSToABxJPIQmVm9PC5blO2Z7aFklsy+jWs3mLiMferWzamopsKktl7azziPsXNgeoAV2tzKrG9huzFHIQJLp5drWJZFZm8WYi5MUnPxNIV6tZt4DtDS1qZ6aaswDiNQy/iQ2ZfURqRG9rKBcIqpGI0o7OWX7OdLX3CCCTYDgCoOnAMqkCLGjAgEag6iLRlq0rOPiz7BBBFigQQQQAQQQQAQQQQAQQQubbbXycNkiZMBd3JEuWDYsQLkkn3VGlzrxGhgSloxwRJzt7jVjP/ZqCQBmIIfPbrfMDbx7OHzY/aaViFOJ8oFSDldCblHABIvzFiCDzB9IhNMlxaNyCFbbbbeRhwVWUzZz6pKXQkXtdm+qL6DiTyBsbKq716iXZ6rDJsqUfrgtzOnvy1B+YhoUWypwR5MKxGXUyUnSWzS5gzKeGniDqCDoRyIj1xJUIIIIAIIIIAIIIIAIIIIAIIIIAII4zHCgliAALknQADiSeUKNZvNwuW2U1Oc9ZaO6+jKtj6EwJSb6HCCMrAto6WsBNNOWZbiBcMt+GZDZh6iNWBAQQQQAQQQQAQQQQBMN8Y7afh1IfcmziWHWzIn+V2+cOwFuGghM31DshQ1etpM8Xt0Nn/wDrI9Ycwb6jhGF3aOmv1FDehg/b0ZmppNpz2qke8APft6DN5oIbtjcaFbRyajTMy2cDlMXuuPLMDbwtA6Aggi4III6g8YSd0M408+uw5z/VTO0l3OpX3Sfy9k3xmJpfwi1caFaL7S68qbT8p/6mHiEbaMdntHStymSMvnYTv+gh5ilvsWh0Ju9tL4bMPR5R+bhf4MR6w7bKzs9FSsTctIkknxMtbwm71x/syd+KT/rJDXsQ18OoyP8A28n/AExGlXRS024III1MAggggAggggDoratJMt5sxgqIpZmPAKBcn5RNhvIrqlicPw4zJIJGeYSM1vUKp8Lkxsb5p7Lhc3LpmaUp8s4P62AjSwKmSXTSUliyrLQD8o18zx9Yzsn4mtcE+WePY/btauaaWokNTVSgns2uQwHHKSAb21sRw1FwDCxtwgnbQUUp9UWUrgHhcNOb9TLT5Rz3q07Slp8Qkj6WnmLc8LoToCemey+UxoNsZ6HF8KqlN0nSwqnqDe3+sIKXlHS3j4yH6ELYKX7HjNZSC4lzU7WWOWhDAAeAd18kh9hD2qb2fGcNqeAcmSx8zlF/8a/wxlU/0XmtR0UUn2jaKreZ3hTqMn3TkRVt+Zz5mH6rplmo0txmVwVYHmCLGErZDXF8WPRkH7zf9sPYiLH+iY9CbuLmt7JPlMbiVPYD1VS1viufiikxNdywsteOlSf4RSo6Uc0/YIIIIkqEEEEAEEEEAEEEY1ftVQyXMubVyEccVaYoYeYvcesBh2bSbQ09DK7WofKL2UDVna18qrzP6DnaEmXvAxKf9JS4Uxk8VaZMys46gED93N6xkUNsXxedNmkTKal7speKNqQp6MGKs5POyDURSoynZjxG8a1nJLNp9rp+JtT4f2MykZ5oFQrHUjTKBcAlbZmsQNQvGHqg2VoZKdmlNKItYl0V2b8TMCTChtoeyxrD5z6Iyql/EO4P+qsUiM5ybw0ikie7U7GmnPtuGXkTpV2MtPddRq2VeA0GqcGGlr8XnYbaZcQpEnCwcd2Yo4K4428CLMPAiPTE2oqtcExVw5y0VWMwP1ZbX4+AViQfuuvSL1T+MpZHUWGCOKOCAQQQRcEagg8CDHKNjnCCCCACCCCAF3eBgprKCfJUXfLnQdXQ5lHra3rGFu5xkVVDKN7vLHZP1ugGUnzTKfUw/wASeUn7Lxl5J0pq7vp0WYSdPRyy26TJcZ2R1G1T+FAie7TTPYcYo60f1c/6Gb05IST5Mjf3ZihQsbyMI9poJoAu8sdqnW6A5gPEpmHqIwg8Zs1qM/eb9FimFz+Rcyz4XdR/CYT6Q7xKdscXaqwWgq73mSpwRzzzKjgn4iqN8QiqS3DAMOBAPz1i93aKV9YK29Ef7Mn+cn/WSGXYH/y2j/4eV/kEYO8dL4bUj7qn5TFP8o2d3L3wyj8JKj8un8ovT0Vt6GOCCCNTAIIIIA4TpqopZiFVQSSTYADUkk8BaEKp3sUgciTIqZ6Ke9NlyxkHj3iDbzAg30VbijlSEOX2iekpj92xa3kSFv1FxDBh1EkiUkmUMqIAoHlzPUniTzMZzn4msIJrWZG0VdT4thNSaV+0shYLazK8u0wKynUE2Hzjhu9xDt8Pp2JuVXsz5yzkufMAH1herQuFYtKnKMtLW/RzVGiKxIBY8hqwbyMyO3dxelqK3Dm/sZnaS/FDYcPw9kfjis/1HTSC8Xg347hwqaebIP8AaIyjwa3dPo1j6RIZuJs2GUU1wQ9BV9k3UJYTFv5ZcnwxbYjW1FH2NRidLwSfKWrT8Ut+0aw8R7QPhitT7RaSLKDfUcIRd78oiklz196TORx6gj/Nl+UMeyNb21FTTOJMpAfxKMrfvAx494lN2mG1I+ynaf4bBz+imKR4kSYmwk4NieKMODtKceTGYR+hEPwiUblphM6qLG57OTx6KXA+QsIq8TZ7BdChuhFpmJr0qm/zOP5RR4nO6gf0nFf+JP8AnmRRo6V0cs/YII66ieqKzuwVVBLMxAVQOJJOgET6v3v0aTCkmTPnheLoFCnyzMCR42ESQk30UWCFjZPbqjxAlZTMk0C5lTAA9hxIsSGA8DpztDPANYEEdFbVpJlvNmMFRFLMx4BVFyflEp//AKzGMTLNh6rTSFNg7ZczebMGF7WNlXThcxDaRMYtm1vZ2jnyhJoqQkT6k2LKbMqlgoCn6pZjbNyCtw4x4ML3XUSSgJ4ebNt3nDsgBPHIqkC34rwrUorf23SLiD55w4MMtimSYVtlUD3r8ReLHGNk38OiEcRMt10n2eur6W57pGW/ErLmMoJ9HT5xTYme059gxmRV8JdQAkw8uSOT0AHZP8JimRnPnkshP3p4MaihZlF3kntBbjlGkwD4e95qI1djcZ9so5U6/ftlmf7xdG+fvDwYRtEA6HUdOsTXYn/Z+J1GHtpLm9+T00BK28TLupPWVBcxwFLhV3k4J7VROVF5kn6VOpyjvr6rfTqFjexbFZNNLMyfMEtOp4k9FA1Y+AhMmb0ZLllpqSon200AAPouYgeYEIp9oMXN3W30yhCyqjM9GxKq3EyW0Jy9VsQSnEXuOhutNUJMVXlsGRgCrKbgg8CCOMQTZTD6r6SnfDpj0tRMQsJgaWZIuRnRiB3lUjW31Y2MNxCo2fqRJnFptBNJyta+QnUkAcHHFkGjDvDW4joUluGMobyi0QR1U1QkxFdGDIwDKw1DAi4IPS0dsXMQggggAhN3qbPmroi0sHtpB7WXb3jb31HiV1Hiqw5QQJTx6Jmx2OitpJc64zWyzAOUxfe9Dow8GEbZET7DZf7LxeZSnSnrPpJPRXubKOmuZP8ADigxyTjjOtPUQzF5ZppeI4cfdWZKnyRysGUG3W8p1/w2iwbMVXa0dNM5tJlk+eUX/W8T7fPhVmk1SjjeS/mLsn6Zx6CGrdhUZ8NkX4r2iflmMB+7aLzexTIXDNHbSVmoKsf/AAzT8lJ/lH3dJOzYVT+Har8prxo10jtJUyX9tGX8ykfzhZ3F1WbD3lnQy5zi3gyq38S3yi1JS3oosEEEbHOEEEEAJO+DDGnYa7p78hlnDwC3Dn0RmPpGhgeIipp5U9f7RFY+Bt3h6NcekMc+UrqysLqwIIPAgixHyiYbvWalnVWGTDrJcvKv9aUx5fNW83PSMrVq03qfw29usE9sopsoC7gZ5f411A+IXX4oneG459Ph1ex7zf0OpPPMtgjv4tLZHP8Auz0ixxFdu8L9mqKiTwk1QFRK6LNQkkDXS+aav96nSKVv/k0f9lqicb25BltTVgF8peS46q6nQ+naD4obdjcW9qo5M4m7Fcr/AI07rfMi/kRHHbfC/aaGfKAu2XOn4k7y/O1vWKR/MiX0Ye56qz0GTnKmuvo1n/5z8ob8TpxMkzZZ1Dy3X8ykfzia7kqvWpldRLmD95W/5YoWJ47S039fPly/ulhmPkg7x9BEzX6C6JjuSmf0ieOZkqfk4/7or8Q3YbFDTVs6bJp51TLYTJaiUhJsZgKk3Hd7q87cYuKm4BtbwPEecLOwhU3Xn+l4qOftAP70yKJE13bvbFMWTq6N+9M/6iKSTaOmPRzT9iabzauZV1dPhMpiqvabPYfYFyo9MpbXmZcNOE4bKppaypCBEUcBxPix4sTzJ1hQ2Ff2utrsR4qz9jKJ+woGo8ColnzJh6jntlrw3gsRPd4dIlPVUNbKASb7SiPYWzg6knxyhlvxIbwEVqJTigOI4zIpVN5NHadNPLOCGtfz7NfV+kVaNq/Uyt7EPfVWNLwxlBt2kyWh8gS5Hrkt5ExobMUKyKSRKXgstb+LEZmPqxJ9Y8O+emL4ZMI/s5kpvQtkP+aPdstVdrR00z7UmXfzCgH9QYpd0Xq6EneO3s+I0FX9W4Vj0COC1z4pMb5GKVCjvSwg1FA5UXaSe1A6qARMH5Cxt4CNDYbGRV0UqYTd1HZzPxoLE+ujfFGT5imaHn3iYD7ZROqi8yX9JL6kqDmX4luPO3SOO7rHvbKNGY3mS/o38SB3W+JbHzvDREvmN+x8VLHSjq+f1UN9SemRifgfwguVgKhE+3s0vZinrkZVmyZigXNi4vmAH2spBNujNDpjGKyqWS06c2VF9SSeAUcyeQieYLhk3Gaj2ysUrSoSJMo8HF+HiLgZm+sRbgNEOOQz7s/gM7FpwrsQFpH9jJFwGXlbmE4G/Fz9216XTyFlqElqEUaBVAAHkBHNRYWGgH6R9iJS0BHixnC5VVJeROF0ceqnky9CDqI9sEQSI+6XFJkidUYVUNdpJZpXit+8B4G6uB0c9IqER7bpvY8Woa1dAxCOeVlOVr+JlzCPhiwx1xerTmsWMIII4zHCgsxAAFyToABxJPIRYzOUKG3G3cugKyUlmfUuLrKXkCbAsQCdToAASbesdVZvRwuW2Xty9uJly3ZfRgLN6XhU2DnLW4pXVp7wBAlE8lYlVIB4Hs0H5j4xWUsWmkIa+TG2ymY1WS1m1FIqLKJmI0pfpJfp2jNbQE93ioOloc9l9uqaopjNnTEkvLyiYGYAXI0ZOoaxsOI1HiW2I9t9gEimxGRNdP6LPYGYFuoU3Am2ItbQh7Dj3ox8vPhm+Z0e/bXbSnrZTUdLJmz3cqQwUgAqwN1W2c9OAGvGPPs9s/jqSRKlOtNLLFu+y5u9a/uq7Dhw0in4ZhkinXJIlJLX7oAv4k8W8zHrivnixInDE2TwmoppTLUVLVDs2bMb9wWAyqSSSLi/LjwEKlHWfsXE5pmgiiqzcONRLe5bX8JLi32SCL2IijQr7T7S4WFanq5qMG0ZAGfL4sUByEcb6EQhJ7pDSawfKeesxVdGDKwBVlNwwPAgjiI7Ij8ifU4DMuC1RhsxuHF5JY8RyBP5W+6TrVcLxGVUylnSXDy3Fww/UHoQdCDqDHSmmc0ouJ64IIIkqETvejhryXk4rTj6SmIE1ftySba+WZh4BifqiKJHXUSVdWRwGVgVYHgQRYg+kGtJi8emFhtck+Uk6WbpMUMp52PIjkRwI6iF/ePgXtdG2UXmyrzE6mw76jzW+nULGXsozYbXTcLmk9kxMylY8w1yUvzPH4lf7Qh2rqgy5bzAjOUVmyILs+UXyqOZPARyNOMjrT1Ey3L4sB29OzACwnrc6W0WYfL+rhhxbeHIV+xpJb1k7kssdz1exuPFQR4iFPAd3s2rd59QppJMxmYSh/WFWbNlsR3VGnEX090aRUMHweRSp2dPLWWvO3vN4sx1Y+Zi0/HdCJns/u7rS7PMm+xo97pKYmZlLXyd02AFh9Y8NRDhhW7zD5GvY9q3NppzXPXJon6Q1wRVzbGHGVLCgKoCqOAAsB5ARygjyLicgzjIE1DOAzGXmGcDrl49PmIqSJuDVS0m0FSJzKiVMkMjMbAnuW1OnFZo8xGhvH23liU1HROJ1VO+jtLObIG0bUaZyLgDle54a7GP7O01aoWolh8vusCVZb8bMCDY6acI68B2WpKO5p5QVjoXJLPboGYkgeAsI2VqSM3BN6dmy2ECkpZUgWui94jgXOrnyzE+lo6dsceWhpXnG2f3ZYP1nI7voNWPgDG3CB2IxXGRLPepqDVhyabfgfjW3lKbrFILykWbxDHuu2balpjNnX9pqT2s0n3gDcqp8dSx8WMOkEEdRyt69M3aPDPaqWfI4dpLZQehI7p9DaJ/ujxIvSvTvpMp3KkHiFYki/k+dfhEVKJDtXKOE4qlaoIpaq4m24Bjq+nW9pg698RSyOo0qljwopHWJhs637LxWZSMbSKmxlE8AST2X65pfiQsU5HBAIIIIBBHAg8CDCrvE2ZNZIDyr+0SbtLtoW4XS/ImwIPIgdTHPF/GbsbIyNqcAl11O0l9D7yNa5RxwPlxBHMExlbBbXLWy+zm92qlizodC9tC6j/MPqnwtDaIjmLBFtl8MqMTmpIqZpamo+6bHRu8QqhtCbgEZjqFHIm8WWTKVFCqAqqAABoAALAAdAIl+6fFZEh6mleYoZpl5bEgLNy3UhTz4BgOeY2iqWi1m6EfIXdvsY9loprhysxx2csg97O2l1/CLt6R82m21pKIEO4eYOEpCC3xHgg8T6Awq4TgFVis9avEV7OQusqRwzDjax1CmwuTq1uQtERj9YNjd/tPJekkpUViNUEsCHcCYbuci96xY5cuut/GHWMCbsXh7TRN9mQOCG7t1W4NwSikKdfCN+IlnwE+31U2ajlsPqzQPRkYfxAim4NU9rTyZn25ct/zKD/OEDe4R+zmvzmSred7/wALw4bDg/s6ivx9mkf6axvV6mVptxNt81bMZaWhlkr7VNyseoDKoU+GZwSPuxSYmW+deybD6v6smfZvUrM/hLYeojRmUPY1aDYqglIEFNLfSxaYod28SzD9BYQr7EyVo8WraQDKrqHljlZTmAHksw/lMUdWBFwbg6g9Ryifby6J5E6nxOSLtJIWYBzS5y36A5mQn746RzRe8M6ihQubwME9ropiKt5ifSSxzLKD3R+Jcy+sbOF18uolJOlG6OoYdfIjkQdCOoj1RRcMkVd22OiqokDG8yTaW/U2Hcb1W2vUNGtj20FPRpnqJgW/uqNXf8KjU+fAcyIltbMqKPFqiXhtnebpkAzBS1ma4uACjXIJ0Aax5w1YDu9Bf2jEZntM9tSpN5Y8Df37dNFHSNHFbrIMmbieJ4wStKppqQ6GYTYsOd3GrfhTTiCYZtn931FTKM0sT5nN5gBHwp7qj5nxMNaqAAAAANABoAPAR9irn8Qw658lXUo6hlYEFSLgg8QRzEIGzTNhGK+x5iaSr1l5jfI50XXrmGTxuhPCKHE93v8A0aUdSB3pVQLHppn/AIyxE1vGRJaitQR8Rri45x9jqOQIIIIATN6WzxqaXtpQPtFMe1lEe93bF1HiQAQPtKsdmyeNrW0sueLXYWcD6rjRh5X1HgRDfEpwWX+zcXn0XCRVfTSOgbUlR8nXyROsZWx1abVS+D9BBBHMbhBBBACft7tNMkZKWlGarn6JbUy1JtmtwuTe19BYk6DX07G7IS6Jc7fSVL37Sabk3OpVSdbX4nix1PIDD2ET2vEKyvfUK3YyvAcNOncCf4jRQ4vLjggIIIIoSZu0uKey0s6fzRCV8XOiD1YgR4t0OEdhh6TG1mVBM5ieJDf1ev4bN5sYw97sxmppNOvvVE9E+XD94pFOpZCy0VFFlRQoHQKLD9I6alxpja/h2wQQRqYBGXtJgcqtp3p5o7rcCOKMNVZfEH56jgY1IIAjeE4/PwdxQ4ipMoX7GcguMg6DiVGmnvLwsRaGabt/hoQv7SG+6FfOfAKVB+ekau8fZoV1G6qLzpd5krrmA1TyYaedjyhL3d4bh9ZTBnpJRnSjkmBlvcgd1yh07w46cQ0YzglydMJajCwrZ+bi86prkc0oLjsWA4sBY6qQbhQLsD7zHjYxvvsfi04GVPxL6I6HKCWYdDopN/Fj6xQZcsKAqgKALAAWAHQAcI5Rm5svgoTN3FA0hZJRrrf6UG01ieJY2s3kRYcgIQtuNnTQvTSkqp7pOzCztooUoOAsD7/TlFshC3wYU0ylSeg71OxJtxCPYMfRgh8gTEwk95DRq4BsDRUhDKhmzFNw80hiD1VQAoPiBfxhojI2VxtayllzhbMRZwPqzB74+eo8CDGvFHu8gIII66ieqKzuwVVBZmJsFA1JJipJO98M8zBS0aH6SbMzW6X+jS/mzH8pit0sgS0VBwVQo8gLCJJsLTtimKTMQmA9hIOWUD9oD6MeYBMwjkzLFgjrgsRz2vXgRkbV4ItbSzadrDOvdY/Vcao3o1vS8a8EXMiZ7tMaZ5TUU8Zail7hU8SimwPjl90n8J5w4VMhZiMjqGRgVZTqGBFiD6Qp7ytnpsqYuK0Q+mlf1yj+0QC2YgcbLo3VdeKiNvZvH5NbJE2SfxpfvS25qw/geY1Ec1kcenVGWoRJEyfgU8q4adh81rhhqZRP/NwBGga1xrcRQKbF5U+Q06mdZoCsRl43AJAI4g35G0eba7FKenpphqMhDKwEtrHtTbRAp43Py4xOdjN3S1NKs+bOmymmXyhMtml8FJuL6nMeNrEQ4a1lja3NU6NJn1JOae8wq7Hjawb95mJPXTpFFiVts1iGFTzNoL1MlgAyEAsbcnQWvrezLqL8ON/U282oDCUcMmCeeEsu4Y8dQnY5iND8jCUXJ6gUqFXDdtEqK40tPLMyWqsWnhu6COgtqpNlzX1J0FtYV8Uo8cxFHzotPKtpKzZDM+6dSx8mKr4RobtcRSTahainSJ9maY7LdXK/WZjYjoBYrqLHWI8cQ0oUI++ID9n6/wDqpb5N/K8PETrfS+aRTyV96ZOJA62Qr/GYsRD2QZTsAdjSyC3vGVLJ88gvHvjrp5eVVXoAPkLR2R1nGEEEEAEIG+HCmaml1krSdSOJgPPISM3oGCN5KesP8dVXTrMRpbi6upVh1DCxHygSnj0wMHxBaiRLnp7sxQ3lfiPMG49I9kIW7ec1NNqsLmm7U7s8sni0tiLm3xI/94YfY45LHh1oI4zeBt0McoIqSIe5gf0BjzM5r+eRIfIQd2/9GqK2gfRkmdrLH2pbWFx8PZn4ofovPshBBBHxmAFybAak9BFCRDx4+047QU4F1kAzX8Dq4uP7uX+eKrEu3WSjV1tbibDusxkyvw6E/JBKHmWiox2QWLDmsesIIIIsZhBBBABEi2pp3wfEfbZak0lUbTlA91zqbeN7uvxjS8V2PHi2GyqmS8icuaW4sR/Ag8iDqDyIiGtWFoyxmdSVKTUWZLYOjgMrDUEHmI7YlLNW7PzSjqaiidrq3AAk8jwSZ1U91uI52e8C2ro6u3Yzlzn+zbuzB17p4+YuI5ZQaOpNM244zEDAqwBBBBB1BB4giOUEUJJtVbGVtDOM7CpgKNxkuRw5L3jZ16EkMOp1MUHDmmmVLM5VWaVXOqm6h7d4A9Lx6Ixcf2qpKMHtpoz/APpr3ph+EcPM2HjF23Ig2JkwKCzEAAEkk2AA4knkImmJVs/HKj2SkulGhBmzraNroSOY07qczqeGnKXT4hjxGhpKC97nVptjy4Zz+4D9oiKngWCyKOSsmnQIg9Sx5sx4knrGsK85ZnOzOEcsEwmTSSUkSFyog06k82Y8yTqTHuggjY5wggggAiI72Nm1oZ0urpM0hJpKzOyLDI/EFQCLBlzd24F18Yt0ZW0+CS62mmU8zQONG5ow1Rh5MAfHhzgWi8ZOsG3byXKz6qpesuAy3uEZTquYlmZhztcDXnFBVQAABYDQAcABwAET7d/jL0znC60ZJ0skSieDqTcKDz6qeYNuIihRyT3eTqQRPd4QNLW0eI2JRD2U21zYHNbQfdaZ6gDnFCjzYlQS58p5M1QyOLMD/EHkQdQRwIiIvGDvlTFZQykMpAII1BB4EHpHKJ7JpsSwkFZKe3UYuVXhOlDiQAASR5Bh4LDzh1V2spJhR5edQ2RxZ0uODDkRBrAemJ3NUYjjsqWNZNEM7HiC6sGIv/vOzW33Gjb282pFHKySu9Uze7KQakX0zleJ10A5mw620t2uyhoKcmbrUTiHmniRxypfna5ueZZo1qj9KWSxDfBBBG5zBBBBABBBBAE43n4ZMp5srFqZbvI7s5ftyupt0uQTyBB+rDJhOJS6mSk6U2ZHFx1HUHoQbgjqIYXUEEEAg6EHgRzBES7E8Ln4JNefSy2nUDnNMkjVpB+0n3fHhYWNrBhlZDeUbVz+Me4Iy8C2gpqxM9PMDdV4Ov4k4jz4dDGpHObmbOwOQ1SlWVInIpQMCQGUgizj61rm3/5GlBBABCZvNxwyqf2aVdqip+jVV97KxsxHifcHifAx6Nptu6el+jlH2ioOiypfes3IOVvb8Iux6c447B7HTzOOI4l3qltZaHhKFrAkDQMASAv1RqbsTbSuGvWUlJJDXsbggoqOTT6ZlW7kcC7d5yPDMTbwAjaggjpOUIIIIAIIIIAIIIIA658lXUo6hlYWKsAQR0IPGJ/j26KinXaQWpm42Xvy7/gY3HkpAiiQQJTa6JCuw2Oye7Ir0ZBwzTZg/daWwHkDHNNldozxrZQH+8P8pEVuCK+KL/yMlP8A4ZYjNP0+KPl5gdo1/m6j9I3Nn91dBTEO6mocG95tsgPUSx3T8V4eoInCrm2fALaCPsEESVCCCCACCCCACCCCAFjbjYyTiMsXPZz0/q5o4rzs3Vb624jiCISZW1FdhhEnFZDPLuFWpl94HpdtA3rlbTgTFdjhOlK4KsAynQgi4I6EHjFZRT7Lxm4ilhu1NFPA7OplEn6pYK/5Gsf0jVM5bXzC3W4tGZiO7TC5xuaYIf8A42dB+VTl/SMlNzWGA3+mPhnW36Jf9Yz/AIf9Nf5UaeIbV0Mi/aVMoEfVVg7flW5/SFl9t6qtJl4VSPM1sZ8wWlr6Xyj4mv8AdMN2Hbu8Lk+7SIx6zC039HJA9IZ5csKAFAAHAAWA8hEqpIq7f6EjYvYMyJhq62Z7RWNrmOqyr8cl7XPLNYWGgAF7vMEEamTbfYQQQQICCCCACCCCACCCCAEvHd2tHPmdtJL0s6988g5deZy8B4lbExmNs9jsjSTWyKlRwE9CrW81UknzaKPHwiIcU+y6m0TY4dtG+naUMr7wzE+YBR4P/DirqP8AzDE5kxOcuUuRT4H6p/JFKgiFFIOyRg7O7HUVDrTyQH4do12mfmPAeAsI3oIIsU3QggggAggggD//2Q==) '
            + picturePosition;
    }, 100);

}

var interval = startRCP();
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        resultWord.textContent = '';
        clearInterval(interval);
        setTimeout(function () {
            interval = startRCP();
        }, 1000);
        makeResult(numRCP[(this.textContent)], numRCP[computerSelect(picturePosition)]);
    });

});
function makeResult(myTurnNum, computerTurnNum) {
    var result = myTurnNum - computerTurnNum;
    if (myTurnNum === computerTurnNum) {
        resultWord.textContent = "비겼습니다"
        drawCount++;
        drawWord.textContent = String(drawCount);
    } else if (result === 1 || result === -2) {
        resultWord.textContent = "이겼습니다!!!";
        winCount++;
        winWord.textContent = String(winCount);
    } else {
        resultWord.textContent = "졌습니다..";
        loseCount++;
        losdWord.textContent = String(loseCount);
    }
}